import React, { useEffect, useState } from 'react';
import { convertVolunteerDetailsFromDB } from '../../ClientUtils';
import { fetchOrganizationsNames, fetchVolunteers } from '../../services/server';
import Navbar from '../Navbar';
import Modal from '../Modal';

function ResponsiblePage(props) {
	const [responsibleState, setResponsibleState] = useState({
		organizations: [],
		users: [],
		isVolunteerClicked: false,
		isElderlyClicked: false,
		isManageVolunteersClicked: false,
		modalisOpen: false
	});

	async function getOrganizationsNames() {
		const response = fetchOrganizationsNames();
		return (await response).json();
	}

	async function getVolunteers() {
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
			{value: dic.organizationEnglishName, label: dic.organizationName}
		));

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
	});

	const toggleModal= () => {
		setResponsibleState({
			modalisOpen: !responsibleState.modalisOpen
		});
	}

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