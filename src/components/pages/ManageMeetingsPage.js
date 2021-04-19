import React from 'react';
import OrganizationMeetingTable from '../meetings/OrganizationMeetingTable';
import Navbar from '../Navbar';

const ManageMeetingsPage = (props) => {
	const organizationMeetings = props.history.location.state;

	return (
		<div className="page">
			<Navbar />
			<h2 className="header">
				פגישות מתנדבים בארגון
			</h2>
			<OrganizationMeetingTable meetings={organizationMeetings}/>
		</div>
	);
};

export default ManageMeetingsPage;