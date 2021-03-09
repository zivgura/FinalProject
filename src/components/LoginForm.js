import React from "react";
import Modal from "./Modal";
import {loginCheck} from "../services/server";

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
            if(user.user.userRole === "volunteer"){
                this.props.history.push("/" + user.user.userRole, user.user.userName);
            }else{
                this.props.history.push("/" + user.user.userRole, user.user.organizationName);
            }
        }
        catch (error) {
            console.log("error");
            console.log(error.message);
            this.setState({message: 'שם משתמש או סיסמה שגויים'});
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



