import React from 'react';
import MeetingView from './MeetingView';

function MeetingTable({props}) {
	const meetings = props.history.location.state;
	return (
		<div className="meetings-table">
			<table className="users-table">
				<thead className="table-header">
				<th className="col-1">קשיש</th>
				<th className="col-2">פגישה</th>
				</thead>
				<tbody>
				{meetings.map((meeting) => (
					<tr key={meeting} className="table-row">
						<MeetingView meeting={meeting} history={props.history}/>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}

export default MeetingTable;