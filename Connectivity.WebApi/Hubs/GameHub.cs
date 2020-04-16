﻿using System.Threading.Tasks;
using Connectivity.Application.GameActions.Interfaces;
using Connectivity.Application.Interfaces;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.Models;
using Microsoft.AspNetCore.SignalR;

namespace Connectivity.WebApi.Hubs
{
    public class GameHub : Hub
    {
        private readonly ILobbyService _lobbyService;
        private readonly IGameActionDispatcher _gameDispatcher;

        public GameHub(ILobbyService lobbyService, IGameActionDispatcher gameDispatcher)
        {
            _lobbyService = lobbyService;
            _gameDispatcher = gameDispatcher;
        }

        public async Task<Lobby> ConnectToLobby(string lobbyId)
        {
            var lobby = await _lobbyService.GetLobbyAsync(lobbyId);
            if (lobby == null)
            {
                return null;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, lobbyId);

            return lobby;
        }

        public async Task GameAction(string lobbyId, GameAction gameAction)
        {
            var gameActionResponse = await _gameDispatcher.DispatchAsync(gameAction);

            await Clients.OthersInGroup(lobbyId)
                .SendAsync(nameof(GameAction), gameActionResponse);
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
