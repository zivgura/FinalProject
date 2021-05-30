import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { setOnMessage } from '../../services/notifacationService';
import { fetchChannels } from '../../services/server';
import { AGORA_APP_ID } from '../../agora.config';
import InComingCallModal from '../modal/InComingCallModal';

function ElderlyPage(props) {
	const [state, setState] = useState({
		modalisOpen: false,
	});
	const [answerCallState, setAnswerCall] = useState({
		answerCall: () => {
			console.log('answer call');
		}
	});

	const setIncomingModal = (data) => {
		openModal(data);
		setAnswerCall( {answerCall: () => {
			console.log('channel'+data.channel);
			console.log('data'+data);
			const videoOptions = {
				'appId': AGORA_APP_ID,
				'channel': data.channel,
				'baseMode': 'avc',
				'transcode': 'interop',
				'attendeeMode': 'video',
				'videoProfile': '480p_4'
			};

			props.history.push('/elderly/meetings/videoCall', {videoOptions:videoOptions, isElderly:true});
		}})
	}

	const openModal = (data) => {
		setState({modalisOpen: true, ...data});
	}

	useEffect(()=>{
		setOnMessage(setIncomingModal);
	})

	async function getChannelsNames() {
		const response = await fetchChannels(props.history.location.state);
		return await response.json();
	}

	const filterChannelsByDate = (channels) => {
		let today = new Date();
		today = today.toLocaleDateString();

		return channels.filter(channel => {
			const day = parseInt(channel.meeting.substring(0, 2));
			const month = parseInt(channel.meeting.substring(3, 5));
			const year = parseInt(channel.meeting.substring(6, 10));
			let date = new Date(year, month-1, day);
			date = date.toLocaleDateString();

			if (date >= today) {
				return channel;
			}
		});
	}

	async function onClick() {
		let channels = await getChannelsNames();
		channels = filterChannelsByDate(channels);
		const videoOptions = {
			'appId': AGORA_APP_ID,
			//todo: not [0]
			'channel': channels[0].channelName,
			'baseMode': 'avc',
			'transcode': 'interop',
			'attendeeMode': 'video',
			'videoProfile': '480p_4'
		};

		props.history.push('/elderly/meetings/videoCall', {videoOptions:videoOptions, isElderly:true});
	}

	return (
		<div className="page">
			<Navbar history={props.history}/>
			<div className="buttons-section">
				<button
					className="sb-btn"
					type="button"
					onClick={onClick}>
					כנס לפגישה
				</button>
			</div>
			{state.modalisOpen ?
				<InComingCallModal
					{...state}
					answerCall = {answerCallState.answerCall}
				/>
				: null
			}
		</div>
	);
}

export default ElderlyPage;
