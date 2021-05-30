import React from 'react';
import Modal from './modal/Modal';
import { loginCheck } from '../services/server';
import * as Cookies from 'js-cookie';
import { createWebSocket } from '../services/notifacationService';

let ws;

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			message: '',
			modalisOpen: false
		};

		this.usernameRef = React.createRef();
		this.passwordRef = React.createRef();
		this.checkOnSubmit = this.checkOnSubmit.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	async checkOnSubmit() {
		try {
			const result = await loginCheck(this.usernameRef.current.value, this.passwordRef.current.value);
			const user = await result.json();
			if (user.user.userRole === 'volunteer') {
				this.props.history.push('/' + user.user.userRole, user.user.userName);
			}
			else if (user.user.userRole === 'elderly') {
				ws = createWebSocket(user.user.userName);
				this.props.history.push('/' + user.user.userRole, user.user.userName);
			}
			else {
				this.props.history.push('/' + user.user.userRole, user.user.organizationType);
			}

			Cookies.set('userName', user.user.userName);
			Cookies.set('organizationName', user.user.organizationName);
		}
		catch (error) {
			this.setState({message: error.message});
			this.toggleModal();
		}
	}

	toggleModal() {
		this.setState(prevState => ({
			modalisOpen: !prevState.modalisOpen
		}));
	}

	render() {
		return (
			<div className="login-wrapper">
				<div className="shadow-box">
					<div className="form-group">
						<h2>התחברות</h2>
						<br/>
						<label>שם משתמש</label>
						<input ref={this.usernameRef} type="text" id="username"/>
						<label>סיסמה</label>
						<input ref={this.passwordRef} type="password" id="password"/>
						<div className="align-right">
							<a className="forgot-password" href="">שכחתי סיסמה</a>
						</div>
						<button className="sb-btn" type="button" onClick={this.checkOnSubmit}>כניסה</button>
						{this.state.modalisOpen ?
							<Modal
								{...this.state}
								closeModal={this.toggleModal}
							/>
							: null
						}
					</div>
				</div>
			</div>
		);
	}
}

export { LoginForm, ws };
