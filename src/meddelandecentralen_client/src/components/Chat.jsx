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
      comments : [],
      newRoom: "",
      room: "",
      id: uuid(),
      name: "",
      message: "",
      showAddRoom: false,
    }
  };


  componentDidMount() {
    ChatHub.start();
    ChatHub.onMessageReceived(this.callBacksObject);
    ChatHub.onMessageDeleted(this.callBacksObject);
    ChatHub.onMessageUpdated(this.callBacksObject);
    ChatHub.onCommentAdded(this.callBacksObject);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ id: uuid() });
    ChatHub.sendMessage(this.state.id, this.state.name, this.state.message, this.state.room, this.state.comments);
    this.setState({ message: "" });
  };

  handleRoomSubmit = (event) => {
    event.preventDefault();
    this.setState({ rooms: [...this.state.rooms, this.state.newRoom] });
    this.setState({ newRoom: "" });
    this.setState({ showAddRoom: false });
  };

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleChangeMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  callBacksObject = {
    messageReceived: (id, user, message, room, comments) => {
      this.setState({ messages: [...this.state.messages, { id, user, message, room, comments }] });
      if (!this.state.rooms.includes(room)) {
        this.setState({ rooms: [...this.state.rooms, room] });
      }
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
    },
    addComment: (id, comment) => {
      ChatHub.addComment(id, comment);
      console.log(comment);
    },
    commentAdded: (id, comment) => {
      this.setState({ messages: this.state.messages.map(message => message.id === id ? { ...message, comments: [...message.comments, comment] } : message) }, () => console.log(this.state.messages));
    }
  }




  render() {
    console.log(this.state.messages);
    return (
      <div className="App">
        <h1>Hotell-Twitter</h1>
        <div className="chatContainer">
          <form onSubmit={this.handleSubmit}>
            <input className="NameInput" type="text" placeholder="Användarnamn" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })}></input>
            <textarea className="MsgInput" placeholder="Meddelande" value={this.state.message} onChange={(event) => this.setState({ message: event.target.value })}></textarea>
            <select onChange={(event) => this.setState({ room: event.target.value })}>
              <option value="">Välj rum</option>
              {this.state.rooms.map(room => <option value={room}>{room}</option>)}
            </select>
            <input className="SendBtn" type="submit" value="Skicka" />
          </form>
          {!this.state.showAddRoom ?
            <div className="addRoomBtnContainer">
              <button className="CreateRoomBtn" onClick={() => this.setState({ showAddRoom: !this.state.showAddRoom })}>Skapa rum</button>
            </div>
            : null
          }
          {this.state.showAddRoom ?
            <div className="addRoomContainer">
              <input className="AddRoomInput" type="text" placeholder="Rum" value={this.state.newRoom} onChange={(event) => this.setState({ newRoom: event.target.value })}></input>
              <button className="SubmitBtn" type="submit" onClick={this.handleRoomSubmit}>Lägg till</button>
            </div>
            : null}
        </div>
        <div>
          {(this.state.messages == null
            ?
            <></>
            :
            <SearchBar list={this.state.messages} filterprop={'room'} customkey={this.state.messages.length + 1} Comp={Message} placeholder={'Filter messages about room...'} customProp={this.callBacksObject} />)}
        </div>
      </div>
    )
  }
}