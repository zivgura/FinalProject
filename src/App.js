import React, { useState } from "react";
import "./styles/App.css";
import { useSpring, animated } from "react-spring";
import RegistrationFormElderly from "./components/RegistrationFormElderly.js"
import RegistrationFormOrganization from "./components/RegistrationFormOrganization";
import RegistrationFormResponsible from "./components/RegistrationFormResponsible";
import RegistrationFormVolunteer from "./components/RegistrationFormVolunteer";
import LoginForm from "./components/LoginForm";
import {serverURL} from "./ClientUtils";

function App() {
    const [registrationFormStatus, setRegistartionFormStatus] = useState({isClicked :false, users: []});

    const loginProps = useSpring({
        left: registrationFormStatus.isClicked ? -500 : 0, // Login form sliding positions
    });
    const registerProps = useSpring({
        left: registrationFormStatus.isClicked ? 0 : 500, // Register form sliding positions
    });

    const loginBtnProps = useSpring({
        borderBottom: registrationFormStatus.isClicked
            ? "solid 0px transparent"
            : "solid 2px #1059FF",  //Animate bottom border of login button
    });
    const registerBtnProps = useSpring({
        borderBottom: registrationFormStatus.isClicked
            ? "solid 2px #1059FF"
            : "solid 0px transparent", //Animate bottom border of register button
    });

    async function getResponsibleUsers() {
        return await fetch(serverURL+`/admin/responsibleUsers`, {
            method: 'get',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let user = (data);
                return user;
            })
    }


    async function registerClicked() {
        let users = await getResponsibleUsers();

        users = users.map((dic) => {
            return {value: dic.userName, label:dic.userName}
        })

        setRegistartionFormStatus({isClicked: true, users: users});

    }

    function loginClicked() {
        setRegistartionFormStatus({isClicked: false});
    }

    return (
        <div className="register-wrapper">
            <div className="nav-buttons">
                <animated.button
                    onClick={loginClicked}
                    id="loginBtn"
                    style={loginBtnProps}
                >
                    Login
                </animated.button>
                <animated.button
                    onClick={registerClicked}
                    id="registerBtn"
                    style={registerBtnProps}
                >
                    Register
                </animated.button>
            </div>
            <div className="form-group">
                <animated.form action="" id="loginform" style={loginProps}>
                    <LoginForm />
                </animated.form>
                <animated.form action="" id="registerform" style={registerProps}>
                    <RegistrationFormOrganization users = {registrationFormStatus.users} />
                    {/*<RegistrationFormElderly  />*/}
                    {/*<RegistrationFormResponsible  />*/}
                    {/*<RegistrationFormVolunteer  />*/}

                </animated.form>
            </div>
            <animated.div className="forgot-panel" style={loginProps}>
                {/*<a herf="#">Forgot your password</a>*/}
            </animated.div>
        </div>
    );
}


export default App;