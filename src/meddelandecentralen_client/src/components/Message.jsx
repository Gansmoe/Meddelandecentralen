import React from "react";

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString()
        }
    }

    render() {
        return (
            <div className="messageContainer">
                <p className="userName">{this.props.message.user} </p> 
                <p className="timeStamp">{this.state.time}</p>
                <p className="message">{this.props.message.message}</p>
            </div>
        );
    }
}
