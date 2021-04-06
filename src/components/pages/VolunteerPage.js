import React, { useEffect, useState } from 'react';
import * as Cookies from 'js-cookie';
import Navbar from '../Navbar';
import { fetchElderlyDetails, getMeetings } from '../../services/server';

function VolunteerPage(props) {
	const [volunteerState, setVolunteerState] = useState({meetings: []});

	async function getMeetingsNames() {
		const response = await getMeetings(Cookies.get('userName'));
		return await response.json();
	}

	async function getElderlyDetails() {
		const response = await fetchElderlyDetails(Cookies.get('organizationName'));
		return await response.json();
	}

	async function onClick() {
		let meetings = await getMeetingsNames();
		let elderlyDetails = await getElderlyDetails();
		meetings =  meetings.map( (dic) => {
			return (
				{meetingDate: dic.meeting, elderlyUserName:	dic.elderlyuserName,
				meetingSubject:	dic.meetingSubject, elderlyDetails: elderlyDetails.find(row => row.userName === dic.elderlyuserName)}
			)
		});

		setVolunteerState({meetings: meetings});
		console.log(meetings);
	}

	useEffect(() => {
		if (volunteerState.meetings.length !== 0) {
			console.log(volunteerState.meetings);
			props.history.push('/volunteer/meetings', volunteerState.meetings);
		}
	});

	return (
		<div className="page">
			<Navbar history={props.history}/>
			<div className="buttons-section">
				<button
					className="sb-btn"
					type="button"
					onClick={onClick}>
					פגישות
				</button>
			</div>
		</div>
	);
}

export default VolunteerPage;
