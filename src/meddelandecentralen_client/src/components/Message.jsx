import React from "react";

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            showUpdate: false,
            message: ""
        }
    }

    render() {
        return (
            <div className="messageContainer">
                <div className="message">
                    <p className="roomName">Rum: {this.props.message.room}</p>
                    <p className="userName">Användare: {this.props.message.user}</p>
                    <p className="timeStamp">{this.state.date}, {this.state.time}</p>
                    <p className="message">{this.props.message.message}</p>
                    <button className="deleteButton" onClick={() => this.props.customProp.deleteMessage(this.props.message.id)}>Ta bort</button>

                    {this.state.showUpdate ?
                        <div className="updateContainer">
                            <input className="updateInput" type="text" onChange={(event) => this.setState({ message: event.target.value })} />
                            <button className="updateButton" onClick={() => { this.props.customProp.updateMessage(this.props.message.id, this.state.message), this.setState({ showUpdate: false }) }}>Update</button>
                        </div>
                        : <button className="updateButton" onClick={() => this.setState({ showUpdate: !this.state.showUpdate })}>Ändra meddelande</button>}
                </div>
            </div>
        );
    }
}