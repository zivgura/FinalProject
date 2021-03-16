import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { getMeetings } from '../../services/server';

function VolunteerPage(props) {

	const [volunteerState, setVolunteerState] = useState({meetings: []});

	async function getMeetingsNames() {
		const response = await getMeetings(props.history.location.state);
		return await response.json();
	}

	async function onClick() {
		let meetings = await getMeetingsNames();
		meetings = meetings.map((dic) => (
			{meetingDate: dic.meeting, elderlyUserName: dic.elderlyuserName}
		));
		setVolunteerState({meetings: meetings});
	}

	useEffect(() => {
		if (volunteerState.meetings.length !== 0) {
			console.log(volunteerState.meetings);
			props.history.push('/volunteer/meetings', volunteerState.meetings);
		}
	});

	return (
		<div className="page">
			<Navbar />
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
