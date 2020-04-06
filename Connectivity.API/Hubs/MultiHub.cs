using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Connectivity.Web.Api.Hubs
{
    public class MultiHub : Hub
    {
        public async Task BroadcastDrawing(string eventName, int x, int y)
        {
            await Clients.All.SendAsync("Draw", new
            {
                Context.ConnectionId,
                eventName,
                x,
                y
            });
        }        
        
        public async Task BroadcastClearCanvas()
        {
            await Clients.All.SendAsync("ClearCanvas");
        }

        public async Task BroadcastChatMessage(string user, string message)
        {
            await Clients.AllExcept(Context.ConnectionId).SendAsync("ReceiveMessage", new {
                Context.ConnectionId,
                user,
                message
            });
        }
    }
}
