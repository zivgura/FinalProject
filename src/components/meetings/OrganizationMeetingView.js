import React from 'react';
import '../manage/manage.css';

function OrganizationMeetingView({meeting}) {

	return (
		<React.Fragment>
			<td className="col-5"></td>
			<td className="col-4">{meeting.meetingSubject}</td>
			<td className="col-3">{meeting.meeting}</td>
			<td className="col-2">{meeting.elderlyFirstName +' '+meeting.elderlyLastName}</td>
			<td className="col-1">{meeting.volunteerFirstName +' '+meeting.volunteerLastName}</td>
		</React.Fragment>
	);
}

export default OrganizationMeetingView;