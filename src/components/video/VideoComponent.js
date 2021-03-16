import { useState } from 'react';
import './video.css';

function VideoComponent() {
	const [joined, setJoined] = useState(false);

	const channelRef = useRef('');
	const remoteRef = useRef('');
	const leaveRef = useRef('');

	return (
		<>
			<div className="container">
				<input
					type="text"
					ref={channelRef}
					id="channel"
					placeholder="Enter Channel name"
				/>
				<input
					type="submit"
					value="Join"
					onClick={handleSubmit}
					disabled={joined ? true : false}
				/>
				<input
					type="button"
					ref={leaveRef}
					value="Leave"
					onClick={handleLeave}
					disabled={joined ? false : true}
				/>
			</div>
			{joined ? (
				<>
					<div id="local-stream" className="stream local-stream"></div>
					<div
						id="remote-stream"
						ref={remoteRef}
						className="stream remote-stream"
					></div>
				</>
			) : null}
		</>
	);
}

export { VideoComponent };