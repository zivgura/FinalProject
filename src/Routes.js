import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationFormOrganization from './components/registrationForms/RegistrationFormOrganization';
import RegistrationFormElderly from './components/registrationForms/RegistrationFormElderly';
import RegistrationFormVolunteer from './components/registrationForms/RegistrationFormVolunteer';
import RegistrationFormResponsible from './components/registrationForms/RegistrationFormResponsible';
import AdminPage from './components/pages/AdminPage';
import ResponsiblePage from './components/pages/ResponsiblePage';
import ManageUsers from './components/manage/ManageUsers';
import VolunteerPage from './components/pages/VolunteerPage';
import MeetingsPage from './components/pages/MeetingsPage';
import VideoCallPage from './components/pages/VideoCallPage';
import ElderlyPage from './components/pages/ElderlyPage';
import { ChangePasswordPage } from './components/pages/ChangePasswordPage';
import './components/registrationForms/RegistrationForm.css';

function Routes() {
	return (
		<div>
			<Switch>
				<Route exact path="/">
					<Redirect to="/login"/>
				</Route>
				<Route exact path="/login" component={LoginForm}/>
				<Route exact path="/user/activate/:username/:password" component={ChangePasswordPage}/>
				<Route exact path="/admin" component={AdminPage}/>
				<Route exact path="/admin/register-responsible" component={RegistrationFormResponsible}/>
				<Route exact path="/admin/register-organization" component={RegistrationFormOrganization}/>
				<Route exact path="/responsible" component={ResponsiblePage}/>
				<Route exact path="/responsible/register-elderly" component={RegistrationFormElderly}/>
				<Route exact path="/responsible/register-volunteer" component={RegistrationFormVolunteer}/>
				<Route exact path="/responsible/manage-volunteers" component={ManageUsers}/>
				<Route exact path="/volunteer" component={VolunteerPage}/>
				<Route exact path="/volunteer/meetings" component={MeetingsPage}/>
				<Route exact path="/volunteer/meetings/videoCall" component={VideoCallPage}/>
				<Route exact path="/elderly" component={ElderlyPage}/>
				<Route exact path="/elderly/meetings/videoCall" component={VideoCallPage}/>
			</Switch>
		</div>
	);
}

export default Routes;