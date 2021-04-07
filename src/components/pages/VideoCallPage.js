import React from 'react';
import { VideoComponent } from '../video/VideoComponent';

function VideoCallPage(props) {
	const videoOptions = props.history.location.state;

	return (
		<div className="page">
			<VideoComponent videoOptions={videoOptions}/>
		</div>
	);
}

export default VideoCallPage;