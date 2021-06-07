import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import InComingCallModal from '../modal/InComingCallModal';
import { AGORA_APP_ID } from '../../agora.config';
import { getCurrentWebSocket, setOnMessage } from '../../services/notifacationService';

function ElderlyPage(props) {
	const nearestMeeting = props.history.location.state;
	const [state, setState] = useState({
		modalisOpen: false
	});

	useEffect(() => {
		getCurrentWebSocket();
	},[])

	const [answerCallState, setAnswerCall] = useState({
		answerCall: () => {
			console.log('answer call');
		}
	});

	const setIncomingModal = (data) => {
		openModal(data);
		setAnswerCall({
			answerCall: () => {
				console.log('channel' + data.channel);
				console.log('data' + data);
				const videoOptions = {
					'appId': AGORA_APP_ID,
					'channel': data.channel,
					'baseMode': 'avc',
					'transcode': 'interop',
					'attendeeMode': 'video',
					'videoProfile': '480p_4'
				};

				props.history.push('/elderly/meetings/videoCall', {videoOptions: videoOptions, isElderly: true});
			}
		});
	};

	const openModal = (data) => {
		setState({modalisOpen: true, ...data});
	};

	useEffect(() => {
		setOnMessage(setIncomingModal);
	});

	async function onClick() {

	}

	const content = (
		<div className="buttons-section">
			<button
				className="sb-btn"
				type="button"
				onClick={onClick}>
				לחץ לבקש שיחה
			</button>
		</div>
	);

	return (
		<div className="page">
			<Sidebar history={props.history} content={content}/>
			<div className="center-page">
				{nearestMeeting
					? (
						<span id="chooseOptionTitle" className="multiline-span">
							השיחה הקרובה שלך תהיה בנושא {nearestMeeting.meetingSubject}
							{'\n'}
							עם {nearestMeeting.firstName + ' ' + nearestMeeting.lastName}
							{'\n'}
							בעוד
						</span>
					)
					: (
						<div id="chooseOptionTitle">
							אין לך שיחות בזמן הקרוב, ניתן ללחוץ על בקשת שיחה
						</div>
					)
				}
			</div>
			{state.modalisOpen ?
				<InComingCallModal
					{...state}
					answerCall={answerCallState.answerCall}
				/>
				: null
			}
		</div>
	);
}

export default ElderlyPage;
