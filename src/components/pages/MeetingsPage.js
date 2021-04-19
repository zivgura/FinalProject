import React from 'react';
import MeetingTable from '../meetings/MeetingTable';
import Navbar from '../Navbar';
import '../meetings/meetings-page.css';

function MeetingsPage(props) {
	return (
		<div className="page">
			<Navbar history={props.history}/>
			<div className="meeting-wrapper">
				<div className="scrollable">
					<MeetingTable props={props}/>
				</div>
			</div>
		</div>
	);
}

export default MeetingsPage;
