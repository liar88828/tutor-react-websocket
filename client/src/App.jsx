import './style/App.css'
// import io from 'socket.io-client'
// const socket = io.connect('http://127.0.0.1:3000')
import {useEffect, useState} from "react";
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:4000');


function App() {
	//--------------------------------- message
	const [message, setMessage] = useState([]);
	const [reciveMessage, setReciveMessage] = useState([]);
	//----------------------- room
	const [room, setRoom] = useState([]);
	const joinRoom = () => {
		if (room !== '') socket.emit('join_room', room);

	}

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setMessage((prevState) => {
			return {...prevState, [name]: value, id: Date.now()};
		})
	}

	const sendMessage = () => {
		// socket.emit()
		socket.emit('send_message',
				{
					message: message, //from handle change
					room: room // from join room
				})
		// {message: 'Hello world'})
	}


	useEffect(() => {
		socket.on('receive_message', (data) => {
			// alert(data.message)
			// console.log(data.message)

			setReciveMessage(prevState => [data.message, ...prevState])

			// setReciveMessage(reciveMessage.push(data.message));


			// const newStateArray = reciveMessage.slice();
			// newStateArray.push(data.message,);
			// setReciveMessage(newStateArray)


			// console.log(data)
		})
	}, [socket])

	// console.log(reciveMessage)
	// console.log(message.pesan)


	// console.log(message)
	return (
			<div className="App">
				<input
						name={'pesan'}
						onChange={handleChange}
						type="text" placeholder="Message....."
				/>
				<button onClick={sendMessage}>Send Message</button>

				{/*{Message.map(sms => {*/}
				{/*	return (*/}
				{/*			<ul>*/}
				{/*				<li>{sms}</li>*/}
				{/*			</ul>)*/}
				{/*})}*/}
				<label>
					Join Room
					<input type="text"
					       onChange={event => setRoom(event.target.value)}
					/>
					<button onClick={joinRoom}>Join Room</button>
				</label>
				<h1>Message</h1>
				{reciveMessage.map(data => {
					return (
							<ul key={data.id}>
								<li>Pesan : {data.pesan}</li>
							</ul>)
				})}
			</div>
	)
}

export default App

//
// import io from 'socket.io-client';
//
// let socket: any;
// const serverUrl = 'http://localhost:2900';
//
// const MyComponent = () => {
// 	useEffect(() => {
// 		socket = io(serverUrl);
//
// 		socket.on('receiveGreet', (data) => {
// 			console.log('data::', data);
// 		});
// 	}, []);
//
// 	return () => {
// 		socket.disconnect();
// 		socket.off();
// 	};
// };
// Share
