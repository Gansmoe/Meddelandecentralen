import React from "react";

export default class Comment extends React.Component {


    render() {
        return (

            <div className="renderedComment">
                <div className="content">
                    <div className="speech-bubble">{this.props.comment}</div>
                </div>
                <div className="author">{this.props.user}</div>
            </div>
        );
    }
}