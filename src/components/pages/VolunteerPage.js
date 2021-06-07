import React, { useEffect, useState } from 'react';
import * as Cookies from 'js-cookie';
import { fetchElderlyDetails, getMeetings } from '../../services/server';
import Sidebar from '../sidebar/Sidebar';
import OpeningScreen from '../openingScreen';

function VolunteerPage(props) {
	const [volunteerState, setVolunteerState] = useState({meetings: [], isMeetingsClicked: false});

	async function getMeetingsNames() {
		const response = await getMeetings(Cookies.get('userName'));
		return await response.json();
	}

	async function getElderlyDetails() {
		const response = await fetchElderlyDetails();
		return await response.json();
	}

	const filterMeetings = (meetings) => {
		let today = new Date();
		let yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		return meetings.filter(meeting => {
			const day = parseInt(meeting.meetingDate.substring(0, 2));
			const month = parseInt(meeting.meetingDate.substring(3, 5));
			const year = parseInt(meeting.meetingDate.substring(6, 10));
			let date = new Date(year, month - 1, day);
			console.log('yesterday');
			console.log(yesterday);
			console.log('date');
			console.log(date);
			if (date >= yesterday) {
				console.log(date + '>=' + today);
				return meeting;
			}
		});
	};

	async function onClick() {
		let meetings = await getMeetingsNames();
		let elderlyDetails = await getElderlyDetails();
		meetings = meetings.map((dic) => (
				{
					meetingDate: dic.meeting,
					elderlyUserName: dic.elderlyuserName,
					meetingSubject: dic.meetingSubject,
					elderlyDetails: elderlyDetails.find(row => row.userName === dic.elderlyuserName)
				}
			)
		);

		meetings = filterMeetings(meetings);
		console.log('filtered meetings');
		console.log(meetings);
		setVolunteerState({meetings: meetings, isMeetingsClicked: true});
	}

	useEffect(() => {
		if (volunteerState.isMeetingsClicked) {
			props.history.push('/volunteer/meetings', volunteerState.meetings);
		}
	});

	const content = (
		<>
			<div className="buttons-section">
				<button
					className="sb-btn"
					type="button"
					onClick={onClick}>
					פגישות
				</button>
			</div>
		</>
	);

	return (
		<div className="page">
			<Sidebar history={props.history} content={content}/>
			<OpeningScreen />
		</div>
	);
}

export default VolunteerPage;
