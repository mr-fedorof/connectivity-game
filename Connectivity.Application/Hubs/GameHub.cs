using System;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Connectivity.Application.GameActions.Interfaces;
using Connectivity.Application.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.Helpers;
using Connectivity.Domain.Models;
using Microsoft.AspNetCore.SignalR;

namespace Connectivity.Application.Hubs
{
    public class GameHub : Hub
    {
        private static readonly GameActionType[] _skipIndexActions = EnumHelper.GetValuesWithAttribute<GameActionType, SkipIndexAttribute>();

        private readonly IGameActionIndexer _gameActionIndexer;
        private readonly IGameActionDispatcher _gameActionDispatcher;
        private readonly ILobbyService _lobbyService;

        public GameHub(
            IGameActionDispatcher gameActionDispatcher,
            IGameActionIndexer gameActionIndexer,
            ILobbyService lobbyService)
        {
            _gameActionDispatcher = gameActionDispatcher;
            _gameActionIndexer = gameActionIndexer;
            _lobbyService = lobbyService;
        }

        public async Task<LobbyConnectResult> ConnectToLobby(string lobbyId)
        {
            var lobby = await _lobbyService.GetLobbyAsync(lobbyId);
            if (lobby == null)
            {
                return null;
            }

            var lobbyConnectResult = new LobbyConnectResult
            {
                Lobby = lobby,
                GlobalActionIndex = _gameActionIndexer.CurrentIndex(lobbyId)
            };

            await Groups.AddToGroupAsync(Context.ConnectionId, lobbyId);

            return lobbyConnectResult; 
        }

        public async Task<GameAction> GameAction(GameAction gameAction)
        {
            var outGameAction = await _gameActionDispatcher.DispatchAsync(gameAction);

            outGameAction.Index = !_skipIndexActions.Contains(gameAction.Type)
                ? _gameActionIndexer.NextIndex(gameAction.LobbyId)
                : -1;

            await Clients.OthersInGroup(gameAction.LobbyId)
                .SendAsync(GameHubMethod.GameAction.ToString(), outGameAction);

            return outGameAction;
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
