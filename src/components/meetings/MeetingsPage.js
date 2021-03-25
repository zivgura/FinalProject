import React from 'react';
import MeetingTable from './MeetingTable';
import Navbar from '../Navbar';
import './meetings-page.css';

function MeetingsPage(props) {
	return (
		<div className="page">
			<Navbar history={props.history}/>
			<MeetingTable props={props}/>
		</div>
	);
}

export default MeetingsPage;
