import React, { useCallback, useEffect, useState } from 'react';
import { convertVolunteerDetailsFromDB } from '../../ClientUtils';
import {
	fetchVolunteerOrganizationMeetings,
	fetchOrganizationsNames,
	fetchVolunteers,
	fetchElderlyOrganizationMeetings
} from '../../services/server';
import Navbar from '../Navbar';
import Modal from '../modal/Modal';
import * as Cookies from 'js-cookie';

function ResponsiblePage(props) {
	const organizationName = Cookies.get('organizationName');

	const [responsibleState, setResponsibleState] = useState({
		organizations: [],
		users: [],
		isVolunteerClicked: false,
		isElderlyClicked: false,
		isManageVolunteersClicked: false,
		isManageVolunteersMeetingsClicked: false,
		isManageElderlyMeetingsClicked: false,
		modalisOpen: false
	});

	async function getOrganizationsNames() {
		const response = fetchOrganizationsNames();
		return (await response).json();
	}

	async function getVolunteerOrganizationMeetings() {
		try {
			const response = fetchVolunteerOrganizationMeetings(organizationName);
			return (await response).json();
		}
		catch (e) {
			console.log("e.message.toString()");
			console.log(e.message.toString());
			setResponsibleState({...responsibleState,
				message: e.message.toString(),
			});

			toggleModal();
		}
	}

	async function getElderlyOrganizationMeetings() {
		try {
			const response = fetchElderlyOrganizationMeetings(organizationName);
			return (await response).json();
		}
		catch (e) {
			console.log("e.message.toString()");
			console.log(e.message.toString());
			setResponsibleState({...responsibleState,
				message: e.message.toString(),
			});

			toggleModal();
		}
	}

	async function getVolunteers() {
		console.log(props.history.location.state);
		try {
			const response = fetchVolunteers(props.history.location.state);
			return (await response).json();
		}
		catch (error) {

		}
	}

	async function onClick(event) {
		let organizations = await getOrganizationsNames();
		organizations = organizations.map((dic) => (
			{value: dic.organizationName, label: dic.organizationName}
		));

		organizations = organizations.filter(obj => obj.value !== 'admin');
		console.log(organizations);
		setResponsibleState({
			organizations: organizations,
			[event.target.name]: true
		});
	}

	async function onClickManageVolunteers(event) {
		let volunteers = await getVolunteers();
		volunteers = convertVolunteerDetailsFromDB(volunteers);
		console.log('volunteers');
		console.log(volunteers);

		setResponsibleState({
			users: volunteers,
			[event.target.name]: true
		});
	}

	async function onClickManageVolunteersMeetings(event) {
		let organizationMeetings = await getVolunteerOrganizationMeetings();
		console.log('organizationMeetings');
		console.log(organizationMeetings);

		setResponsibleState({
			volunteerOrganizationMeetings: organizationMeetings,
			[event.target.name]: true
		});
	}

	async function onClickManageElderlyMeetings(event) {
		let organizationMeetings = await getElderlyOrganizationMeetings();
		console.log('organizationMeetings');
		console.log(organizationMeetings);

		setResponsibleState({
			elderlyOrganizationMeetings: organizationMeetings,
			[event.target.name]: true
		});
	}

	useEffect(() => {
		if (responsibleState.isVolunteerClicked) {
			console.log(responsibleState.organizations);
			props.history.push('/responsible/register-volunteer', responsibleState.organizations);
		}
		else if (responsibleState.isElderlyClicked) {
			console.log(responsibleState.organizations);
			props.history.push('/responsible/register-elderly', responsibleState.organizations);
		}
		else if (responsibleState.isManageVolunteersClicked) {
			props.history.push('/responsible/manage-volunteers', {
				organizationName: props.history.location.state,
				users: responsibleState.users
			});
		}
		else if (responsibleState.isManageVolunteersMeetingsClicked) {
			console.log('responsibleState.volunteerOrganizationMeetings');
			console.log(responsibleState.volunteerOrganizationMeetings);
			props.history.push('/responsible/manage-volunteers-meetings', responsibleState.volunteerOrganizationMeetings);
		}
		else if (responsibleState.isManageElderlyMeetingsClicked) {
			console.log('responsibleState.elderlyOrganizationMeetings');
			console.log(responsibleState.elderlyOrganizationMeetings);
			props.history.push('/responsible/manage-elderly-meetings', responsibleState.elderlyOrganizationMeetings);
		}
	});

	const toggleModal = useCallback(
		() => {
			setResponsibleState({...responsibleState,
				modalisOpen: !responsibleState.modalisOpen});
		}, [responsibleState.modalisOpen]);

	return (
		<div className="page">
			<Navbar history={props.history} organizationName={props.history.location.state}/>
			<div className="buttons-section">
				<button
					className="sb-btn"
					name="isVolunteerClicked"
					type="button"
					onClick={(e) => onClick(e)}
				>
					צור מתנדב חדש
				</button>
				<button
					className="sb-btn"
					name="isElderlyClicked"
					type="button"
					onClick={(e) => onClick(e)}
				>
					צור קשיש חדש
				</button>
				<button
					className="sb-btn"
					name="isManageVolunteersClicked"
					type="button"
					onClick={(e) => onClickManageVolunteers(e)}
				>
					נהל מתנדבים
				</button>
				<button
					className="sb-btn"
					name="isManageVolunteersMeetingsClicked"
					type="button"
					onClick={(e) => onClickManageVolunteersMeetings(e)}
				>
					נהל פגישות מתנדבים
				</button>
				<button
					className="sb-btn"
					name="isManageElderlyMeetingsClicked"
					type="button"
					onClick={(e) => onClickManageVolunteersMeetings(e)}
				>
					נהל פגישות קשישים
				</button>
			</div>
			{responsibleState.modalisOpen ?
				<Modal
					{...responsibleState}
					closeModal={toggleModal}
				/>
				: null
			}
		</div>
	);
}

export default ResponsiblePage;