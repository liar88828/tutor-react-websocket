// const express = require("express");
// const http = require('http')
// const {Server} = require('socket.io')
// const cors = require('cors')
// const app = express();
// const PORT = 4000
//
// app.use(cors())
//
// const server = http.createServer(app);
//
// const io = new Server(server, {
// 	// cors: {
// 	// 	origin: 'http://127.0.0.1:5173/',
// 	// 	methods: ['GET', 'POST',],
// 	// },
// });
//
// io.on('connection', (socket) => {
// 	console.log('USer Connected' + socket.id)
//
//
// 	// socket.on('send_Message', (data) => {
// 	// 	socket.broadcast.emit('receive_message', data)
// 	// 	// console.log(data)
// 	// })
// })
//
// server.listen(PORT, () => {
// 	console.log('SERVER IS RUNNING : ' + PORT)
// });
//


//
// const io = new Server(server, {
// 	cors: {
// 		origin: 'http://127.0.0.1:5173/',
// 		methods: ['GET', 'POST',],
// 	},
// });


// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// io.on('connection', (socket) => {
//
// 	console.log('USer Connected' + socket.id)
// });
// server.listen(4000,()=>{
// 	console.log('Connect')
// });


const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app)
const io = socketio(server, {cors: {origin: '*',}}) //for omit cors error

const PORT = 4000;
app.use(express.json());
app.use(cors());


io.on('connect', (socket) => {
	console.log("user connected" + socket.id)

	socket.on('join_room', (data) => {
		socket.join(data)
		console.log(data)
	})

	socket.on('send_message', (data) => {
		console.log('data::', data)                        // for backend
		// socket.broadcast.emit('receive_message', data)         // for frond end

		socket.to(data.room)
				.emit('receive_message', data)
	})


	// 	socket.emit('receive_message', {data: 'This message from server'}, (error) => {
	// 		console.log('error::', error)
	// })

	socket.on('disconnect', () => {
		console.log('user disconnected')

	})
})


app.get('/', (req, res) => {
	res.json('api running')
})

server.listen(PORT, () => console.log(`server running in node on port ${PORT}`));