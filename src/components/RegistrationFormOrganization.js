import React, {Component} from 'react';
import Modal from './Modal.js';
import './RegistrationForm.css';
import Select from "react-select";
import organizationTypes from "../resources/organizationTypes";


class RegistrationFormOrganization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizationName:'',
            organizationType: '',
            phoneNumber: '',
            valid: {
                organizationName: true,
                organizationType: true,
                phoneNumber: true
            },
            touched: {
                organizationName:false,
                organizationType: false,
                phoneNumber: false
            },
            modalisOpen: false
        };

        this.rexExpMap = {
            organizationName: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
            organizationType: /^[a-zA-Z\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
            phoneNumber: /^\+?\d+(-\d+)*$/
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

    validate(organizationName, organizationType, phoneNumber) {
        return {
            organizationName: organizationName.length === 0,
            organizationType: organizationType.length === 0,
            phoneNumber: phoneNumber.length === 0
        };
    }

    requiredStyle(name) {
        const show = (this.state[name] === "" || !this.state.valid[name]) && this.state.touched[name];
        return {display: show ? 'block' : 'none'};
    }

    errorMessages(name) {
        const requiredStr = 'This field is required.';
        const invalidStr = 'Enter valid ' + name + '.';
        return !this.state.valid[name] && this.state[name] !== "" ? invalidStr : requiredStr;
    }

    checkOnSubmit() {
        const {organizationName, organizationType, phoneNumber} = this.state;
        const formFilled = !(organizationName === '' || organizationType === '' || phoneNumber === '');
        const formInvalid = Object.keys(this.state.valid).some(x => !this.state.valid[x]);
        const formHasErrors = !formFilled || formInvalid;

        if (!formHasErrors) {
            this.toggleModal();
        }
        this.setState({
            touched: {
                organizationName:true,
                organizationType: true,
                phoneNumber: true
            },
        });

        this.handleSubmit()
    }

    handleSubmit() {
        try {
            fetch(`http://localhost:3001/admin/registerOrganization`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...this.state})
            })
                .then(response => console.log(response.json()))

            this.props.history.push("/admin");
        }
        catch (error){
            this.setState({message: error.response.data.message});
            this.toggleModal();
        }
    }

    toggleModal() {
        this.setState(prevState => ({
            modalisOpen: !prevState.modalisOpen
        }));
    }

    render() {
        const errors = this.validate(this.state.organizationName, this.state.organizationType, this.state.phoneNumber);
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };
        const helpMessage = (name) => {
            return {display: shouldMarkError(name) ? 'none' : 'block'};
        };

        return (
            <div className="container">
                <div className="register-form">
                    <div className="form">
                        <div>
                            <label>
                                שם ארגון
                                <input
                                    type="text"
                                    value={this.state.organizationName}
                                    name="organizationName"
                                    className={shouldMarkError("organizationName") ? "error" : ""}
                                    onChange={(e) => this.handleChange(e, "organizationName")}/>
                            </label>
                            <span className="required-field"
                                  style={this.requiredStyle('organizationName')}>{this.errorMessages('organizationName')}</span>
                        </div>
                        <div>
                            <label>
                                סוג ארגון
                                <Select
                                    name="organizationType"
                                    className={shouldMarkError("organizationType") ? "error" : ""}
                                    value ={this.state.organizationType}
                                    options={organizationTypes}
                                    onChange={(value)=>this.setState({organizationType: value})}
                                />
                            </label>
                            <span className="required-field"
                                  style={this.requiredStyle('organizationType')}>{this.errorMessages('organizationType')}</span>
                        </div>

                        <div>
                            <label>
                                מספר טלפון
                                <input
                                    type="text"
                                    value={this.state.phoneNumber}
                                    name="phoneNumber" id="phoneNumber"
                                    className={shouldMarkError("phoneNumber") ? "error" : ""}
                                    onChange={(e) => this.handleChange(e, "phoneNumber")}/>

                            </label>
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
        );
    }
}


export default RegistrationFormOrganization;

