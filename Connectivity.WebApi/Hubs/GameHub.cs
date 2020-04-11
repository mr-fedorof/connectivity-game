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

        // public async Task JoinRoom(string roomId, string userName)
        // {
        //     await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
        //
        //     await Clients.Group(roomId).SendAsync("ReceiveServiceMessage", $"{Context.ConnectionId} AKA {userName} has joined the room {roomId}.");
        // }
        //
        // public async Task LeaveRoom(string roomId, string userName)
        // {
        //     await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
        //
        //     await Clients.Group(roomId).SendAsync("ReceiveServiceMessage", $"{Context.ConnectionId} has left the group {roomId}.");
        // }
        //
        //
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
