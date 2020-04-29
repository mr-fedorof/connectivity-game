using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.Models;
using Microsoft.AspNetCore.SignalR;

namespace Connectivity.Application.Hubs
{
    public class GameHub : Hub
    {
        private readonly IGameHubService _gameHubService;

        public GameHub(IGameHubService gameHubService)
        {
            _gameHubService = gameHubService;
        }

        public async Task<LobbyConnectResult> ConnectToLobby(string lobbyId)
        {
            var result = await _gameHubService.ConnectToLobbyAsync(Context.ConnectionId, lobbyId);

            return result; 
        }

        public async Task<GameAction> GameAction(GameAction gameAction)
        {
            var result = await _gameHubService.ProcessGameActionAsync(Context.ConnectionId, gameAction);

            return result;
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
