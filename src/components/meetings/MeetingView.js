import React from 'react';
import { AGORA_APP_ID } from '../../agora.config';
import * as Cookies from 'js-cookie';
import { notifyElderly } from '../../services/server';
import videoCall from '../../resources/video-call-icon.png';
import '../manage/manage.css';

function MeetingView({meeting, history}) {
	const userName = Cookies.get('userName');
	const elderlyDetails = meeting.elderlyDetails;
	const channel = userName+meeting.elderlyUserName+meeting.meetingDate;

	const onClick = async () => {
		const videoOptions = {
			'appId': AGORA_APP_ID,
			'channel': channel,
			'baseMode': 'avc',
			'transcode': 'interop',
			'attendeeMode': 'video',
			'videoProfile': '480p_4'
		};

		await notifyElderly(meeting.elderlyUserName, userName, channel, meeting.meetingSubject);
		history.push('/volunteer/meetings/videoCall', {videoOptions:videoOptions, isElderly:false});
	};

	return (
		<React.Fragment>
			<td className="col-1">{elderlyDetails.firstName +' '+elderlyDetails.lastName}</td>
			<td className="col-2">{meeting.meetingDate}</td>
			<td className="col-3">{meeting.meetingSubject}</td>
			<td className="col-4">
				<button className="check-icon-button">
					<img className="video-call-icon-button" src={videoCall} alt="call" onClick={onClick}/>
				</button>
			</td>
		</React.Fragment>
	);
}

export default MeetingView;
