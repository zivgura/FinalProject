import React from 'react';
import { AGORA_APP_ID } from '../../agora.config';
import * as Cookies from 'js-cookie';
import '../manage/manage.css';

function MeetingView({meeting, history}) {
	const userName = Cookies.get('userName');
	const elderlyDetails = meeting.elderlyDetails;
	const channel = userName+meeting.elderlyUserName+meeting.meetingDate;

	const onClick = () => {
		const videoOptions = {
			'appId': AGORA_APP_ID,
			'channel': channel,
			'baseMode': 'avc',
			'transcode': 'interop',
			'attendeeMode': 'video',
			'videoProfile': '480p_4'
		};

		history.push('/volunteer/meetings/videoCall', videoOptions);
	};

	return (
		<React.Fragment>
			<td className="col-4">
				<button
					className="table-button"
					type="button"
					onClick={onClick}>
					התחל שיחה
				</button>
			</td>
			<td className="col-3">{meeting.meetingSubject}</td>
			<td className="col-2">{meeting.meetingDate}</td>
			<td className="col-1">{elderlyDetails.firstName +' '+elderlyDetails.lastName}</td>
		</React.Fragment>
	);
}

export default MeetingView;