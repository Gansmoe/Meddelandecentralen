using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string id, string user, string message, string room)
        {
            await Clients.All.SendAsync("ReceiveMessage", id, user, message, room);
        }

        public async Task DeleteMessage(string id)
        {
            await Clients.All.SendAsync("MessageDeleted", id);
        }

        public async Task UpdateMessage(string id, string message)
        {
            await Clients.All.SendAsync("MessageUpdated", id, message);
        }
    }
}