using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Connectivity.WebApi.Hubs
{
    public class GameHub : Hub
    {
        public async Task<bool> ConnectToLobby(string lobbyId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, lobbyId);

            return true;
        }

        public async Task GameAction(string lobbyId, object payload)
        {
            await Clients
                .GroupExcept(lobbyId, Context.ConnectionId)
                .SendCoreAsync(nameof(GameAction), new []{ payload });
        }

        // public async Task BroadcastDrawing(string roomId, string eventName, int x, int y)
        // {
        //     await Clients.OthersInGroup(roomId).SendAsync("Draw", new
        //     {
        //         Context.ConnectionId,
        //         eventName,
        //         x,
        //         y
        //     });
        // }
        //
        // public async Task BroadcastClearCanvas(string roomId)
        // {
        //     await Clients.Group(roomId).SendAsync("ClearCanvas");
        // }
        //
        // public async Task BroadcastChatMessage(string roomId, string userName, string message)
        // {
        //     await Clients.Group(roomId).SendAsync("ReceiveMessage", new
        //     {
        //         Context.ConnectionId,
        //         userName,
        //         message
        //     });
        // }
    }
}
