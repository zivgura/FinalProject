import React from 'react';
import Navbar from '../Navbar';
import MeetingTable from '../meetings/MeetingTable';
import '../meetings/meetings-page.css';

const MeetingsPage = (props) =>
	<div className="page">
		<Navbar history={props.history}/>
		<div className="meeting-wrapper">
			<div className="scrollable">
				<MeetingTable props={props}/>
			</div>
		</div>
	</div>;

export default MeetingsPage;
