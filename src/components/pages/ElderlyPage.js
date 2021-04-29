import React from 'react';
import Navbar from '../Navbar';
import { fetchChannels } from '../../services/server';
import { AGORA_APP_ID } from '../../agora.config';

function ElderlyPage(props) {
	async function getChannelsNames() {
		const response = await fetchChannels(props.history.location.state);
		return await response.json();
	}

	async function onClick() {
		let channels = await getChannelsNames();
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
		</div>
	);
}

export default ElderlyPage;
