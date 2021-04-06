import React from 'react';
import MeetingView from './MeetingView';

function MeetingTable({props}) {
	const meetings = props.history.location.state;
	return (
		<div className="meetings-table">
			<table className="users-table">
				<thead className="table-header">
				<tr>
					<th className="col-4">פעולות</th>
					<th className="col-3">נושא הפגישה</th>
					<th className="col-2">פגישה</th>
					<th className="col-1">קשיש</th>
				</tr>
				</thead>
				<tbody>
				{meetings.map((meeting, index) => (
					<tr key={index} className="table-row">
						<MeetingView key={index} meeting={meeting} history={props.history}/>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}

export default MeetingTable;