import AgoraRTC from 'agora-rtc-sdk-ng';

// const liveClient = AgoraRTC.createClient({mode: 'live', codec: 'vp8'});
const rtc = {
	// For the local client.
	client: null,
	// For the local audio and video tracks.
	localAudioTrack: null,
	localVideoTrack: null
};

const options = {
	appId: 'ba380425fc1d472d8a19ae63415672a3',
	// Set the channel name.
	channel: 'nadavziv',
	// Pass a token if your project enables the App Certificate.
	token: '006ba380425fc1d472d8a19ae63415672a3IADt0CH/41eTRNLKzhNOvS4s9+Npxiv7C6xj/zyoOtUnNCEv3qAAAAAAEADqgOQ9NzhLYAEAAQA2OEtg'
};

const startCall = async () => {
	rtc.client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'});
	const uid = await rtc.client.join(options.appId, options.channel, options.token, null);
	console.log(uid);
	// Create an audio track from the audio sampled by a microphone.
	rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
	// Create a video track from the video captured by a camera.
	rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
	// Publish the local audio and video tracks to the channel.
	await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

	console.log('publish success!');

	rtc.client.on('user-unpublished', user => {
		// Get the dynamically created DIV container.
		const playerContainer = document.getElementById(user.uid);
		// Destroy the container.
		playerContainer.remove();
	});
};

const leaveCall = async () => {
	// Destroy the local audio and video tracks.
	rtc.localAudioTrack.close();
	rtc.localVideoTrack.close();

	// Traverse all remote users.
	rtc.client.remoteUsers.forEach(user => {
		// Destroy the dynamically created DIV container.
		const playerContainer = document.getElementById(user.uid);
		playerContainer && playerContainer.remove();
	});

	// Leave the channel.
	await rtc.client.leave();
}

export {
	startCall,
	leaveCall
};