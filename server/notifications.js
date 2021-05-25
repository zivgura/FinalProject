const WebSocketServer = require('websocket').server;

const clients = new Set();
let wws;

const initWebSocketServer = (server) => {
	wws = new WebSocketServer({
		httpServer: server
	});

	wws.on('request', (request) => {
		const connection = request.accept(null, request.origin);
		let clientId = (request.resourceURL.query.param);
		clients[clientId] = connection;
		console.log(new Date() +'- Received new connection from origin: ' + request.origin);

		connection.on('close', ()=> {
			console.log('connection closed to '+ clientId);
			clients.delete(clientId);
		});

		connection.on('message', (message) => {
			console.log('Server received message: '+ message);
		})

	});
};

const notifyElderly = (elderlyId, volunteerName, channel, meetingSubject) => {
	clients[elderlyId].send(JSON.stringify({
		message:'incoming call',
		volunteerName: volunteerName,
		channel: channel,
		meetingSubject: meetingSubject
	}));
}

exports.initWebSocketServer = initWebSocketServer;
exports.notifyElderly = notifyElderly;
exports.clients = clients;
