import React, { useCallback, useEffect, useState } from 'react';
import { tryLogin, updatePassword } from '../../services/server';
import Modal from '../Modal';
import { useParams } from 'react-router-dom';

function ChangePasswordPage() {
	const {username, password} = useParams();
	console.log(username);
	console.log(password);

	useEffect(async () => {await tryLogin(username,password)} ,[]);

	// const userName = Cookies.get('userName');
	const [state, setState] = useState({modalisOpen: false, newPassword: '', confirmNewPassword: ''});

	const handleChange = (e) => {
		setState({[e.target.name]: e.target.value});
	};

	const bindThisToToggleModal = useCallback(
		() => {
			setState({modalisOpen: !state.modalisOpen});
		}, [state.modalisOpen]
	);

	const toggleModal = () => {
		setState({modalisOpen: !state.modalisOpen});
	};

	const checkOnSubmit = async () => {
		if (state.newPassword === state.confirmNewPassword) {
			await updatePassword(username, state.newPassword);
			setState({message: 'הסיסמה שונתה בהצלחה'});
		}
		else {
			setState({message: 'הסיסמאות לא זהות'});
		}

		toggleModal();
	};

	return (
		<div className="page">
			<div className="form">
				<div className="field">
					<label>
						סיסמה חדשה
						<input
							minLength={8}
							type="password"
							value={state.newPassword}
							name="newPassword"
							onChange={(e) => handleChange(e)}/>
					</label>
				</div>

				<div className="field">
					<label>
						אשר סיסמה חדשה
						<input
							minLength={8}
							type="password"
							value={state.confirmNewPassword}
							name="confirmNewPassword"
							onChange={(e) => handleChange(e)}/>
					</label>
				</div>

				<button className="sb-btn" type="button" onClick={checkOnSubmit}>אישור</button>
			</div>
			{state.modalisOpen ?
				<Modal
					{...state}
					closeModal={bindThisToToggleModal}
				/>
				: null
			}
		</div>
	);
}

export { ChangePasswordPage };