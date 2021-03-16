import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationFormOrganization from './components/registrationForms/RegistrationFormOrganization';
import RegistrationFormElderly from './components/registrationForms/RegistrationFormElderly';
import RegistrationFormVolunteer from './components/registrationForms/RegistrationFormVolunteer';
import RegistrationFormResponsible from './components/registrationForms/RegistrationFormResponsible';
import AdminPage from './components/pages/AdminPage';
import ResponsiblePage from './components/registrationForms/ResponsiblePage';
import ManageUsers from './components/manage/ManageUsers';
import VolunteerPage from './components/pages/VolunteerPage';
import MeetingsPage from './components/meetings/MeetingsPage';
import './components/registrationForms/RegistrationForm.css';

function Routes() {
	return (
		<div>
			<Switch>
				<Route exact path="/">
					<Redirect to="/login"/>
				</Route>
				<Route exact path="/login" component={LoginForm}/>
				<Route exact path="/admin" component={AdminPage}/>
				<Route exact path="/admin/register-responsible" component={RegistrationFormResponsible}/>
				<Route exact path="/admin/register-organization" component={RegistrationFormOrganization}/>
				<Route exact path="/responsible" component={ResponsiblePage}/>
				<Route exact path="/responsible/register-elderly" component={RegistrationFormElderly}/>
				<Route exact path="/responsible/register-volunteer" component={RegistrationFormVolunteer}/>
				<Route exact path="/responsible/manage-volunteers" component={ManageUsers}/>
				<Route exact path="/volunteer" component={VolunteerPage}/>
				<Route exact path="/volunteer/meetings" component={MeetingsPage}/>
				{/*<Route exact path="/volunteer/meetings" component={ElderlyPage}/>*/}
			</Switch>
		</div>
	);
}

export default Routes;