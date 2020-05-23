using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Connectivity.Application.GameActions.Interfaces;
using Connectivity.Application.Hubs;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;
using Connectivity.Domain.Helpers;
using Connectivity.Domain.Models;
using Microsoft.AspNetCore.SignalR;

namespace Connectivity.Application.Services
{
    public class GameHubService : IGameHubService
    {
        private static readonly GameActionType[] _skipIndexActions = EnumHelper.GetValuesWithAttribute<GameActionType, SkipIndexAttribute>();

        private readonly IHubContext<GameHub> _hubContext;
        private readonly IGameActionIndexer _gameActionIndexer;
        private readonly IGameActionDispatcher _gameActionDispatcher;
        private readonly ILobbyService _lobbyService;
        private readonly IGameService _gameService;

        public GameHubService(
            IHubContext<GameHub> hubContext,
            IGameActionDispatcher gameActionDispatcher,
            IGameActionIndexer gameActionIndexer,
            ILobbyService lobbyService,
            IGameService gameService)
        {
            _gameActionDispatcher = gameActionDispatcher;
            _gameActionIndexer = gameActionIndexer;
            _lobbyService = lobbyService;
            _gameService = gameService;
            _hubContext = hubContext;
        }

        public async Task<LobbyConnectResult> ConnectToLobbyAsync(string currentConnectionId, Guid lobbyId)
        {
            var lobby = await _lobbyService.GetLobbyAsync(lobbyId);
            if (lobby == null)
            {
                return null;
            }

            var lobbyConnectResult = new LobbyConnectResult
            {
                Lobby = lobby,
                GlobalActionIndex = await _gameActionIndexer.CurrentIndex(lobbyId)
            };

            await _hubContext.Groups.AddToGroupAsync(currentConnectionId, lobbyId.ToString());

            return lobbyConnectResult; 
        }

        public async Task<GameAction> ProcessGameActionAsync<T>(string currentConnectionId, GameAction<T> gameActionT)
            where T : class
        {
            var gameAction = new GameAction(gameActionT);

            return await ProcessGameActionAsync(currentConnectionId, gameAction);
        }

        public void DrawMove(string currentConnectionId, string lobbyId, DrawPayload drawPayload)
        {
            // Call the client method to draw the line. 
            // TODO: add current step as Id as well (possibly playerID?);
            Task.Run(() => _gameService.SaveDrawing(lobbyId, drawPayload));
            _hubContext.Clients.GroupExcept(lobbyId, currentConnectionId).SendAsync(GameHubMethod.DrawMove.ToString(), drawPayload);
        }

        public async Task RestoreDrawings(string currentConnectionId, string lobbyId)
        {
            var drawings = await _gameService.RestoreDrawings(lobbyId);
            if (drawings != null)
            {
                await _hubContext.Clients.Client(currentConnectionId).SendAsync(GameHubMethod.RestoreDrawings.ToString(), drawings);
            }
        }

        public async Task<GameAction> ProcessGameActionAsync(string currentConnectionId, GameAction gameAction)
        {
            var outGameAction = await _gameActionDispatcher.DispatchAsync(gameAction);

            outGameAction.Index = !_skipIndexActions.Contains(gameAction.Type)
                ? await _gameActionIndexer.NextIndex(gameAction.LobbyId)
                : -1;

            outGameAction.CreatedAt = DateTime.UtcNow;

            var targetClients = currentConnectionId != null
                ? _hubContext.Clients.GroupExcept(gameAction.LobbyId.ToString(), currentConnectionId)
                : _hubContext.Clients.Group(gameAction.LobbyId.ToString());

            await targetClients.SendAsync(GameHubMethod.GameAction.ToString(), outGameAction);

            return outGameAction;
        }
    }
}
