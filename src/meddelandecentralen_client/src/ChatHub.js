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

    sendMessage = async(user, message) => {
        const data = await this.connection.invoke("SendMessage", user, message);
        return data;
    }

    onMessageReceived(callBacksObject) {
        this.connection.on("ReceiveMessage", callBacksObject.messageReceived);
    }
}

export default new ChatHub();