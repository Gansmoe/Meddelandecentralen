import * as SignalR from "@microsoft/signalr";


class ChatHub {
    constructor() {
        this.connection = new SignalR.HubConnectionBuilder()
            .withUrl("https://localhost:6001/chathub")
            .withAutomaticReconnect([5000, 10000, 15000, 20000, 25000, 30000])
            .build();
    }

    async start(callBacksObject) {
        console.log("Starting connection");
        
        try {
            return await this.connection.start();
        } catch (err) {
            console.log(err);
            await callBacksObject.hadError();
        }
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

    addComment = async(id, comment, name) => {
        const data = await this.connection.invoke("AddComment", id, comment, name);
        return data;
    }

    onCommentAdded(callBacksObject) {
        this.connection.on("CommentAdded", callBacksObject.commentAdded);
    }

}

export default new ChatHub();