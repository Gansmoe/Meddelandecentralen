import * as SignalR from "@microsoft/signalr";


class ChatHub {
    constructor() {
        this.connection = new SignalR.HubConnectionBuilder()
            .withUrl("https://localhost:6001/chathub")
            .build();
    }

    start() {
        return this.connection.start();
    }

    stop() {
        return this.connection.stop();
    }

    sendMessage = async(id, user, message, room, comments) => {
        const data = await this.connection.invoke("SendMessage", id, user, message, room, comments);
        return data;
    }

    onMessageReceived(callBacksObject) {
        this.connection.on("ReceiveMessage", callBacksObject.messageReceived);
    }

    deleteMessage = async(id) => {
        const data = await this.connection.invoke("DeleteMessage", id);
        return data;
    }

    onMessageDeleted(callBacksObject) {
        this.connection.on("MessageDeleted", callBacksObject.messageDeleted);
    }

    updateMessage = async(id, message) => {
        const data = await this.connection.invoke("UpdateMessage", id, message);
        return data;
    }

    onMessageUpdated(callBacksObject) {
        this.connection.on("MessageUpdated", callBacksObject.messageUpdated);
    }

    addComment = async(id, comment) => {
        const data = await this.connection.invoke("AddComment", id, comment);
        return data;
    }

    onCommentAdded(callBacksObject) {
        this.connection.on("CommentAdded", callBacksObject.commentAdded);
    }

}

export default new ChatHub();