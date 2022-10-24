import React from "react";

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            user: props.user,
            message: props.message,
            room: props.room,
            isEditing: false,
            editMessage: props.message,
        }
    };

    handleEdit = () => {
        this.setState({ isEditing: true });
    };

    handleDelete = () => {
        this.props.deleteMessage(this.state.id);
    };

    handleEditSubmit = (event) => {
        event.preventDefault();
        this.props.editMessage(this.state.id, this.state.editMessage);
        this.setState({ isEditing: false });
    };

    handleEditChange = (event) => {
        this.setState({ editMessage: event.target.value });
    };

    render() {
        return (
            <div className="comment">
                <div className="content">
                    <div className="author">{this.props.user}</div>
                    {this.state.isEditing ?
                        <form onSubmit={this.handleEditSubmit}>
                            <input type="text" value={this.state.editMessage} onChange={this.handleEditChange} />
                            <button type="submit">Save</button>
                        </form>
                        :
                        <div className="text">{this.props.message}</div>
                    }
                </div>
                <div className="actions">
                    <a className="reply" onClick={this.handleEdit}>Edit</a>
                    <a className="reply" onClick={this.handleDelete}>Delete</a>
                </div>
            </div>
        );
    }
}