import React from "react";
import Modal from "./Modal";


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
        const user = await fetch(`http://localhost:3001/user/login`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.usernameRef.current.value,
                password: this.passwordRef.current.value
            })
        })
            .then(result => {
                //Here body is not ready yet, throw promise
                if (!result.ok) throw result;
                return result.json();
            })
            .then(data => data)
            .catch((error) => {
                console.log("errorrrrrr");
                console.log(error.message);
                this.setState({message: error.message});
                this.toggleModal();
            })

        try {
            console.log("user");
            console.log(user);

            this.props.history.push("/" + user.user.userRole, user.user.organizationName);
        } catch (error) {

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
                <div className="form-group">
                    <label for="username">שם משתמש</label>
                    <input ref={this.usernameRef} type="text" id="username"/>
                    <label for="password">סיסמה</label>
                    <input ref={this.passwordRef} type="password" id="password"/>
                    <button className="sb-btn" type="button" onClick={this.checkOnSubmit}>SUBMIT</button>
                    {this.state.modalisOpen ?
                        <Modal
                            text='Message'
                            {...this.state}
                            closeModal={this.toggleModal}
                        />
                        : null
                    }
                </div>
            </div>
        );
    }

}

export default LoginForm;



