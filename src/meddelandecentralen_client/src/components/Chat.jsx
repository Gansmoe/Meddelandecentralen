import React from "react";
import ChatHub from "../ChatHub";
import Message from "./Message";
import SearchBar from "./SearchBar";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      name: "",
      message: "",
    }
  };


  componentDidMount() {
    ChatHub.start();
    ChatHub.onMessageReceived(this.callBacksObject);
  }



  handleSubmit = (event) => {
    event.preventDefault();
    ChatHub.sendMessage(this.state.name, this.state.message);
    this.setState({ message: "" });
  };

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleChangeMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  callBacksObject = {
    messageReceived: (user, message) => {
      this.setState({ messages: [...this.state.messages, { user, message }] });
    }
  }




  render() {
    console.log(this.state.messages);
    return (
      <div className="App">
        <h1>Chat</h1>
        <div className="chatContainer">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Användarnamn" value={this.state.name} onChange={this.handleChangeName}></input>
            <input type="text" placeholder="Meddelande" value={this.state.message} onChange={this.handleChangeMessage}></input>
            <input type="submit" value="Skicka" />
          </form>
        </div>
        <div>
            {(this.state.messages == null
            ? 
            <></> 
            : 
            <SearchBar list={this.state.messages} filterprop={'user'} customkey={this.state.messages.length + 1} Comp={Message} placeholder={'Filter messages about room...'} />)}
            </div>
      </div>
    )
  }
}