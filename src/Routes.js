import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationFormOrganization from './components/RegistrationFormOrganization';
import RegistrationFormElderly from './components/RegistrationFormElderly';
import RegistrationFormVolunteer from './components/RegistrationFormVolunteer';
import RegistrationFormResponsible from './components/RegistrationFormResponsible';
import AdminPage from './components/AdminPage';
import ResponsiblePage from './components/ResponsiblePage';
import ManageUsers from './components/ManageUsers';
import './styles/RegistrationForm.css';

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
			</Switch>
		</div>
	);
}

export default Routes;