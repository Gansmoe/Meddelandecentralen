import React from "react";
import ChatHub from "../ChatHub";
import Message from "./Message";
import SearchBar from "./SearchBar";
import { v4 as uuid } from 'uuid';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      rooms: [],
      id: uuid(),
      name: "",
      message: "",
    }
  };


  componentDidMount() {
    ChatHub.start();
    ChatHub.onMessageReceived(this.callBacksObject);
    ChatHub.onMessageDeleted(this.callBacksObject);
    ChatHub.onMessageUpdated(this.callBacksObject);
  }



  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ id: uuid() });
    ChatHub.sendMessage(this.state.id, this.state.name, this.state.message);
    this.setState({ message: "" });
  };

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleChangeMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  callBacksObject = {
    messageReceived: (id, user, message) => {
      this.setState({ messages: [...this.state.messages, { id, user, message }] });
    },
    messageDeleted: (id) => {
      this.setState({ messages: this.state.messages.filter(message => message.id !== id) });
    },
    deleteMessage: (id) => {
      ChatHub.deleteMessage(id);
    },
    messageUpdated: (id, newMessage) => {
      this.setState({ messages: this.state.messages.map(message => message.id === id ? { ...message, message: newMessage } : message) });
    },
    updateMessage: (id, message) => {
      ChatHub.updateMessage(id, message);
    }
  }




  render() {
    console.log(this.state.messages);
    return (
      <div className="App">
        <h1>Hotell-Twitter</h1>
        <div className="chatContainer">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Användarnamn" value={this.state.name} onChange={this.handleChangeName}></input>
            <input type="textarea" placeholder="Meddelande" value={this.state.message} onChange={this.handleChangeMessage}></input>
            <select placeholder="Välj rum">
              <option value="1">Rum 1</option>
              <option value="2">Rum 2</option>
              <option value="3">Rum 3</option>
            </select>
            <input type="submit" value="Skicka" />
          </form>
        </div>
        <div>
            {(this.state.messages == null
            ? 
            <></> 
            : 
            <SearchBar list={this.state.messages} filterprop={'user'} customkey={this.state.messages.length + 1} Comp={Message} placeholder={'Filter messages about room...'} customProp={this.callBacksObject} />)}
            </div>
      </div>
    )
  }
}