import React, {Component} from 'react';
import Select from "react-select";
import Modal from './Modal.js';
import '../styles/RegistrationForm.css';
import responsibleTypes from '../resources/responsibleTypes';
import genderList from '../resources/genders';
import {serverURL} from "../ClientUtils";
import { registerOrganization, registerResponsible } from '../services/server';

class RegistrationFormResponsible extends Component {
    constructor(props) {
        super(props);
        console.log(props.history.location.state);
        this.state = {
            organizationName: '',
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            gender: '',
            responsibleType: '',
            valid: {
                firstName: true,
                lastName: true,
                username: true,
                password: true,
                email: true,
            },
            touched: {
                firstName: false,
                lastName: false,
                username: false,
                password: false,
                email: false,
                gender: false
            },
            modalisOpen: false
        };

        this.rexExpMap = {
            firstName: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
            lastName: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
            username: /^[a-z\d._]+$/,
            password: /^.{8,}$/,
            email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        }

        this.handleChange = this.handleChange.bind(this);
        this.checkData = this.checkData.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.checkOnSubmit = this.checkOnSubmit.bind(this);

    }

    handleChange = (e, name) => {
        this.setState({[e.target.name]: e.target.value}, () => {
            this.checkData(this.rexExpMap[name], this.state[name], this.state.valid[name], name)
        });
    }

    checkData(regExp, stateName, stateValid, name) {
        this.setState({
            touched: {...this.state.touched, [name]: true}
        });
        if (regExp.test(stateName)) {
            this.setState({
                valid: {...this.state.valid, [name]: true}
            });
        } else {
            this.setState({
                valid: {...this.state.valid, [name]: false}
            });
        }
    }

    validate(firstName, lastName, username, password, email) {
        return {
            firstName: firstName.length === 0,
            lastName: lastName.length === 0,
            username: username.length === 0,
            password: password.length === 0,
            email: email.length === 0
        };
    }

    requiredStyle(name) {
        const show = (this.state[name] === "" || !this.state.valid[name]) && this.state.touched[name];
        return {display: show ? 'block' : 'none'}
    }

    errorMessages(name) {
        const requiredStr = 'This field is required.';
        const invalidStr = 'Enter valid ' + name + '.';
        return !this.state.valid[name] && this.state[name] !== "" ? invalidStr : requiredStr
    }

    checkOnSubmit() {
        console.log("checkOnSubmit");
        const {firstName, lastName, username, password, email} = this.state;
        const formFilled = !(firstName === '' || lastName === '' || username === '' || password === '' || email === '');
        const formInvalid = Object.keys(this.state.valid).some(x => !this.state.valid[x]);
        const formHasErrors = !formFilled || formInvalid;

        if (!formHasErrors) {
            this.toggleModal();
        }
        this.setState({
            touched: {
                firstName: true,
                lastName: true,
                username: true,
                password: true,
                email: true,
            },
        });
        this.handleSubmit()
    }

    async handleSubmit() {
        try {
            const response = await registerResponsible(this.state);
            await response.json();
            this.setState({message: 'הרישום הצליח'})
            this.toggleModal();
            // this.props.history.push("/admin");
        } catch (error) {
            this.setState({message: 'הרישום נכשל'})
            this.toggleModal();
        }
    }

    toggleModal() {
        this.setState(prevState => ({
            modalisOpen: !prevState.modalisOpen
        }));
    }

    render() {
        const errors = this.validate(this.state.firstName, this.state.lastName,
            this.state.username, this.state.password, this.state.email);
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        }
        const helpMessage = (name) => {
            return {display: shouldMarkError(name) ? 'none' : 'block'}
        }

        return (
            <div>
                <h2 className="header">
                    טופס רישום אחראי
                </h2>
                <div className="register-wrapper">
                    <div className="container">
                        <div className="register-form">
                            <div className="form">
                                <div className="field">
                                    <label>
                                        שם ארגון
                                        <Select
                                            name="organizationName"
                                            className={shouldMarkError("organizationName") ? "error" : ""}
                                            value={this.state.organizationName}
                                            options={this.props.history.location.state}
                                            onChange={(value) => this.setState({organizationName: value})}
                                        />
                                    </label>
                                    <span className="required-field"
                                          style={this.requiredStyle('organizationName')}>{this.errorMessages('organizationName')}</span>
                                </div>
                                <div className="field">
                                    <label>
                                        שם פרטי
                                        <input
                                            type="text"
                                            value={this.state.firstName}
                                            name="firstName" id="firstName"
                                            className={shouldMarkError("firstName") ? "error" : ""}
                                            onChange={(e) => this.handleChange(e, "firstName")}/>
                                    </label>
                                    <span className="required-field"
                                          style={this.requiredStyle('firstName')}>{this.errorMessages('firstName')}</span>
                                </div>

                                <div className="field">
                                    <label>
                                        שם משפחה
                                        <input
                                            type="text"
                                            value={this.state.lastName}
                                            name="lastName" id="lastName"
                                            className={shouldMarkError("lastName") ? "error" : ""}
                                            onChange={(e) => this.handleChange(e, "lastName")}/>
                                    </label>
                                    <span className="required-field"
                                          style={this.requiredStyle('lastName')}>{this.errorMessages('lastName')}</span>
                                </div>

                                <div className="field">
                                    <label>
                                        שם משתמש
                                        <input
                                            type="text"
                                            value={this.state.username}
                                            name="username"
                                            className={shouldMarkError("username") ? "error" : ""}
                                            onChange={(e) => this.handleChange(e, "username")}/>
                                    </label>
                                    <span className="required-field"
                                          style={this.requiredStyle('username')}>{this.errorMessages('username')}</span>
                                </div>

                                <div className="field">
                                    <label>
                                        סיסמה
                                        <input
                                            type="password"
                                            value={this.state.password}
                                            name="password"
                                            className={shouldMarkError("password") ? "error" : ""}
                                            onChange={(e) => this.handleChange(e, "password")}/>
                                    </label>
                                    <span className="note" style={helpMessage('password')}>At least 8 characters</span>
                                    <span className="required-field"
                                          style={this.requiredStyle('password')}>{this.errorMessages('password')}</span>
                                </div>

                                <div className="field">
                                    <label>
                                        כתובת דואר אלקטרוני
                                        <input
                                            type="text"
                                            name="email"
                                            value={this.state.email}
                                            className={shouldMarkError("email") ? "error" : ""}
                                            onChange={(e) => this.handleChange(e, "email")}/>
                                    </label>
                                    <span className="required-field"
                                          style={this.requiredStyle('email')}>{this.errorMessages('email')}</span>
                                </div>

                                <div className="field">
                                    <label>
                                        מגדר
                                        <Select
                                            name="gender"
                                            className={shouldMarkError("gender") ? "error" : ""}
                                            value={this.state.gender}
                                            options={genderList}
                                            onChange={(value) => this.setState({gender: value})}
                                        />
                                    </label>
                                    <span className="required-field"
                                          style={this.requiredStyle('gender')}>{this.errorMessages('gender')}</span>
                                </div>

                                <div className="field">
                                    <label>
                                        סוג אחראי
                                        <Select
                                            name="responsibleType"
                                            className={shouldMarkError("responsibleType") ? "error" : ""}
                                            value={this.state.responsibleType}
                                            options={responsibleTypes}
                                            onChange={(value) => this.setState({responsibleType: value})}
                                        />
                                    </label>
                                    <span className="required-field"
                                          style={this.requiredStyle('gender')}>{this.errorMessages('responsibleType')}</span>
                                </div>
                                <button className="sb-btn" type="button" onClick={this.checkOnSubmit}>SUBMIT</button>
                            </div>
                        </div>
                        {this.state.modalisOpen ?
                            <Modal
                                text='Your Data'
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

export default RegistrationFormResponsible;