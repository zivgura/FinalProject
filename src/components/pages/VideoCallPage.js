import React from 'react';
import { VideoComponent } from '../video/VideoComponent';

function VideoCallPage(props) {
	const videoOptions = props.history.location.state.videoOptions;
	const isElderly = props.history.location.state.isElderly;

	return (
		<div className="page">
			<VideoComponent videoOptions={videoOptions} isElderly={isElderly}/>
		</div>
	);
}

export default VideoCallPage;