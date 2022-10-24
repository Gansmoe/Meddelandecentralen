import React from "react";

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
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
            <div className="commentContainer">
                <div className="content">
                    <div className="text">{this.props.comment}</div>
                </div>
            </div>
        );
    }
}