import { serverURL } from '../ClientUtils';

const loginCheck = async (username, password) =>
	await fetch(serverURL + `/user/login`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			username,
			password
		})
	});

const fetchOrganizationsNames = async () =>
	await fetch(serverURL + `/admin/organizationNames`, {
		method: 'get'
	});

const fetchElderlyMatches = async (user) =>
	await fetch(serverURL + `/responsible/assign`,
		{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				volunteerUsername: user.userName,
				volunteerServices: user.services
			})
		});

const registerElderly = async (state) =>
	await fetch(serverURL + `/responsible/registerElderly`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({...state})
	});

const registerOrganization = async (state) =>
	fetch(serverURL+`/admin/registerOrganization`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({...state})
	});

const registerResponsible = async (state) =>
	fetch(serverURL+`/admin/registerResponsible`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({...state})
	});

const registerVolunteer = async (state) =>
	fetch(serverURL+`/responsible/registerVolunteer`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({...state})
	});

const fetchVolunteers = async (state) =>
	await fetch(serverURL+`/responsible/volunteersDetails/` + new URLSearchParams(state),
		{
			method: 'get',
		});

export {
	loginCheck,
	fetchOrganizationsNames,
	fetchElderlyMatches,
	registerElderly,
	registerOrganization,
	registerResponsible,
	registerVolunteer,
	fetchVolunteers
};