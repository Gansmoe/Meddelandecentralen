using Microsoft.AspNetCore.SignalR;


namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string id, string user, string message, string room, IEnumerable<Comments> comments)
    
        {
            await Clients.All.SendAsync("ReceiveMessage", id, user, message, room, comments);
        }

        public async Task DeleteMessage(string id)
        {
            await Clients.All.SendAsync("MessageDeleted", id);
        }

        public async Task UpdateMessage(string id, string message)
        {
            await Clients.All.SendAsync("MessageUpdated", id, message);
        }

        public async Task AddComment(string id, string comment)
        {
            await Clients.All.SendAsync("CommentAdded", id, comment);
        }
    }
}