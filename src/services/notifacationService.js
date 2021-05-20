import { wssURL } from '../ClientUtils';
import { w3cwebsocket as W3WebSocket } from 'websocket';

const createWebSocket = () => {
	 const ws = new W3WebSocket(wssURL);

	 ws.onopen = () => {
	 	console.log('client websocket connected');
	 }

	 ws.onmessage = (message) => {
	 	console.log('client onmessage');
	 	//notify
	 }

	 ws.onclose = () => {
	 	console.log('client onclose');
	 }

	 return ws;
};

export { createWebSocket };