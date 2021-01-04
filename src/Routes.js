import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import "./RegistrationForm.css";
import LoginForm from "./LoginForm";
import RegistrationFormOrganization from "./RegistrationFormOrganization";
import RegistrationFormElderly from "./RegistrationFormElderly";
import RegistrationFormVolunteer from "./RegistrationFormVolunteer";
import RegistrationFormResponsible from "./RegistrationFormResponsible";

function Routes() {
    return (
        <div className="login-register-wrapper">
            <Switch>
                <Route exact path="/login" component={LoginForm}/>

                {/*<Route exact path="/admin"/>*/}
                <Route exact path="/admin/register-responsible" component={RegistrationFormResponsible}/>
                <Route exact path="/admin/register-organization" component={RegistrationFormOrganization}/>

                {/*<Route exact path="/responsible"/>*/}
                <Route exact path="/responsible/register-elderly" component={RegistrationFormElderly}/>
                <Route exact path="/responsible/register-volunteer" component={RegistrationFormVolunteer}/>
            </Switch>
        </div>
    )
}

export default Routes;