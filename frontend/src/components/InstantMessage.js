import React, { Component } from "react";
import socketIOClient from "socket.io-client";

const endpoint = "http://localhost:3030/socket.io"
let socket = undefined;

let messages = [];

/*
 * Props should include:
 *     userId: the userid for the logged in user
 *     otherUser: the userid for the recipient user for the chat
 */
class InstantMessage extends Component {
	constructor(props) {
		super(props)
		console.log("This instant message is for user " + props.userId)
		this.state = {
			connected: false,
			text: ""
		}
	}

	componentDidMount() {
		socket = socketIOClient(endpoint)
		socket.on("connect", () => {
			console.log("Client connected")
			this.setState({
				connected: true
			})
			socket.emit("init", this.props.userId)
		})
		socket.on("message", (data) => {
			console.log("message received")
			messages.push({
				userId: data.from,
				content: data.message
			})
		})
	}

	handleChange = (e) => {
		this.setState({ text: e.target.value });
	}

	sendMessage() {
		console.log("sending message")
		if (socket) {
			socket.send({
				from: this.props.userId,
				to: this.props.otherUser,
				message: this.state.text
			}, (status) => {
				console.log("status received")
				if (status == "offline") {
					console.log(`User ${this.props.otherUser} is offline`)
					messages.push({
						userId: "INFO",
						content: "User is offline"
					})
				} else {
					messages.push({
						userId: this.props.userId,
						content: this.state.text
					})
				}
			})
		}
	}

	render() {
		return (
			<div>
				<div>
					{messages.map((message) => {
						return ( <p>{message.userId}: {message.content}</p> )
					})}
				</div>
				<div>
					<input type="text" value={this.state.text} onChange={this.handleChange}/><button type="button" onClick={this.sendMessage()}>Send</button>
				</div>
			</div>
		);
	}
}

export default InstantMessage;
