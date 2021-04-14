import React from 'react';
import OrganizationMeetingView from './OrganizationMeetingView';

function OrganizationMeetingTable(props) {
	const meetings = props.meetings;
	return (
		<div className="meetings-table">
			<table className="users-table">
				<thead className="table-header">
				<tr>
					<th className="col-5">פעולות</th>
					<th className="col-4">נושא הפגישה</th>
					<th className="col-3">תאריך ושעת פגישה</th>
					<th className="col-2">קשיש</th>
					<th className="col-1">מתנדב</th>
				</tr>
				</thead>
				<tbody>
				{meetings.map((meeting, index) => (
					<tr key={index} className="table-row">
						<OrganizationMeetingView key={index} meeting={meeting}/>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}

export default OrganizationMeetingTable;