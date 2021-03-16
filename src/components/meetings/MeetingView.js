import React from 'react';
import { startCall } from '../../services/videoService';
import '../manage/manage.css';

function MeetingView({meeting}) {

	return (
		<React.Fragment>
			<td className="col-1">{meeting.elderlyUserName}</td>
			<td className="col-2">{meeting.meetingDate}</td>
			<td className="col-3">
				<button
					className="table-button"
					type="button"
					onClick={startCall}>
					התחל שיחה
				</button>
			</td>
		</React.Fragment>
	);
}

export default MeetingView;