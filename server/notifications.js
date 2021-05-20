const WebSocketServer = require('websocket').server;

const clients = new Set();
let wws;
let clientId;

const initWebSocketServer = (id, server) => {
	wws = new WebSocketServer({
		httpServer: server.server
	});

	clientId = id;
	console.log('client Id: ' + clientId);

	wws.on('request', (request) => {
		const connection = request.accept(null, request.origin);
		clients[clientId] = connection;
		console.log(new Date() +'- Received new connection from origin: ' + request.origin);

		connection.on('close', ()=> {
			console.log('connection closed');
			clients.delete(clientId);
		});

		connection.on('message', (message) => {
			console.log('Server received message: '+ message);
		})

	});
};

exports.initWebSocketServer = initWebSocketServer;
exports.clients = clients;
