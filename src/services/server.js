import { serverURL } from '../ClientUtils';
import { handleError } from './errorHandler';

const loginCheck = async (username, password) => {
	const response = await fetch(serverURL + `/user/login`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			username,
			password
		})
	});

	handleError(response);
	return response;
}


const tryLogin = async (username, password) => {
	await fetch(serverURL + `/user/activate/`+ new URLSearchParams({username,password}), {
		method: 'post'
	});
}

const updatePassword = async (username, newPassword) => {
	await fetch(serverURL + `/user/updatePassword`, {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			username,
			newPassword
		})
	});
}

const fetchOrganizationsNames = async () =>
	await fetch(serverURL + `/admin/organizationNames`, {
		method: 'get'
	});

const fetchElderlyMatches = async (user) => {
	const response = await fetch(serverURL + `/responsible/assign`,
		{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				volunteerUsername: user.userName,
				volunteerServices: user.services
			})
		});

	handleError(response);
	return response;
}

const registerElderly = async (state) => {
	const response = await fetch(serverURL + `/responsible/registerElderly`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({...state})
	});

	handleError(response);
	return response;
};

const registerOrganization = async (state) => {
	const response = await fetch(serverURL + `/admin/registerOrganization`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({...state})
	});

	handleError(response);
	return response;
};

const registerResponsible = async (state) => {
	const response = await fetch(serverURL + `/admin/registerResponsible`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({...state})
	});

	handleError(response);
	return response;
};

const registerVolunteer = async (state) => {
	const response = await fetch(serverURL + `/responsible/registerVolunteer`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({...state})
	});

	handleError(response);
	return response;
};

const fetchVolunteers = async (state) => {
	const response = await fetch(serverURL + `/responsible/volunteersDetails/` + new URLSearchParams(state),
		{
			method: 'get'
		});

	handleError(response);
	return response;
};

const addMeetingDB = async (state) => {
	const response = await fetch(serverURL + '/responsible/addMeeting', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({...state})
	});

	handleError(response);
	return response;
}

const fetchOrganizationMeetings = async (organizationName) =>{
	const response = await fetch(serverURL + `/responsible/meetings/` + new URLSearchParams(organizationName),
		{
			method: 'get'
		});

	handleError(response);
	return response;
}

const getMeetings = async (state) => {
	const response = await fetch(serverURL + `/volunteer/meetings/` + new URLSearchParams(state),
		{
			method: 'get'
		});

	handleError(response);
	return response;
}

const fetchChannels = async (elderlyUserName) => {
	const response = await fetch(serverURL + `/elderly/channels/` + new URLSearchParams(elderlyUserName),
		{
			method: 'get'
		});

	handleError(response);
	return response;
}

const fetchElderlyDetails = async (elderlyUserName) =>{
	const response = await fetch(serverURL + `/elderly/details/` + new URLSearchParams(elderlyUserName),
		{
			method: 'get'
		});

	handleError(response);
	return response;
}

export {
	loginCheck,
	tryLogin,
	updatePassword,
	fetchOrganizationsNames,
	fetchElderlyMatches,
	registerElderly,
	registerOrganization,
	registerResponsible,
	registerVolunteer,
	fetchVolunteers,
	addMeetingDB,
	getMeetings,
	fetchChannels,
	fetchElderlyDetails,
	fetchOrganizationMeetings
};