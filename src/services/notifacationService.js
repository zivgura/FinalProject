import { w3cwebsocket as W3WebSocket } from 'websocket';
import { wssURL } from '../ClientUtils';

const setOnMessage = (func) => {
	onMessage = func;
}

let onMessage;

const createWebSocket = (clientId) => {
	const ws = new W3WebSocket(`${wssURL}?param=${clientId}`);

	ws.onopen = () => {
		console.log('client websocket connected');
	};

	ws.onmessage = (message) => {
		console.log('client onmessage received '+ message.data);
		onMessage(JSON.parse(message.data));
	};

	ws.onclose = () => {
		console.log('client onclose');
	};

	return ws;
};

export {
	createWebSocket,
	setOnMessage
};