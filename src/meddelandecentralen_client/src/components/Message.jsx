import React from "react";
import Comment from "./Comment";

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            showUpdate: false,
            message: "",
            comment: ""
        }
    }


    handleCommentSubmit = (event) => {
        event.preventDefault();
        this.props.customProp.addComment(this.props.message.id, this.state.comment);
        console.log(this.props.message.comments);
        this.setState({ comment: "" });
    };

    render() {
        console.log(this.state.comment);
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
                            <button className="updateButton" onClick={() => { this.props.customProp.updateMessage(this.props.message.id, this.state.message), this.setState({ showUpdate: false }) }}>Uppdatera meddelande</button>
                        </div>
                        : <button className="updateButton" onClick={() => this.setState({ showUpdate: !this.state.showUpdate })}>Ändra meddelande</button>}
                </div>

                <div className="commentContainer">
                    <div className="comments">
                        <h3>Kommentarer</h3>
                        {this.props.message.comments = null ?
                            <p>Inga kommentarer</p>
                            :
                            this.props.message.comments.map((comment) => <Comment key={comment.id} user={this.props.message.user} comment={comment} />)
                        }
                    </div>
                </div>
                <form onSubmit={this.handleCommentSubmit}>
                        <div className="addComment">
                            <input className="commentInput" placeholder="Skriv kommentar..." type="text" value={this.state.comment} onChange={(event) => this.setState({ comment: event.target.value })} />
                            <input className="commentButton" type="submit" value="Lägg till kommentar" />
                        </div>
                    </form>
            </div>
        )
    }
}
