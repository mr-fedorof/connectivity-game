﻿using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Connectivity.Application.GameActions.Interfaces;
using Connectivity.Application.Hubs;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.Helpers;
using Connectivity.Domain.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;

namespace Connectivity.Application.Services
{
    public class GameHubService : IGameHubService
    {
        private static readonly GameActionType[] _skipIndexActions = EnumHelper.GetValuesWithAttribute<GameActionType, SkipIndexAttribute>();

        private readonly IHubContext<GameHub> _hubContext;
        private readonly IGameActionIndexer _gameActionIndexer;
        private readonly IGameActionDispatcher _gameActionDispatcher;
        private readonly ILobbyService _lobbyService;
        private readonly JsonSerializerOptions _jsonOptions;

        public GameHubService(
            IHubContext<GameHub> hubContext,
            IGameActionDispatcher gameActionDispatcher,
            IGameActionIndexer gameActionIndexer,
            ILobbyService lobbyService,
            IOptions<JsonSerializerOptions> jsonSerializerOptions)
        {
            _gameActionDispatcher = gameActionDispatcher;
            _gameActionIndexer = gameActionIndexer;
            _lobbyService = lobbyService;
            _hubContext = hubContext;
            _jsonOptions = jsonSerializerOptions.Value;
        }

        public async Task<LobbyConnectResult> ConnectToLobbyAsync(string currentConnectionId, string lobbyId)
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

            await _hubContext.Groups.AddToGroupAsync(currentConnectionId, lobbyId);

            return lobbyConnectResult; 
        }

        public async Task<GameAction> ProcessGameActionAsync<T>(string currentConnectionId, GameAction<T> gameActionT)
            where T : class
        {
            var gameAction = new GameAction(gameActionT);

            return await ProcessGameActionAsync(currentConnectionId, gameAction);
        }

        public async Task<GameAction> ProcessGameActionAsync(string currentConnectionId, GameAction gameAction)
        {
            var outGameAction = await _gameActionDispatcher.DispatchAsync(gameAction);

            outGameAction.Index = !_skipIndexActions.Contains(gameAction.Type)
                ? _gameActionIndexer.NextIndex(gameAction.LobbyId)
                : -1;

            var targetClients = currentConnectionId != null
                ? _hubContext.Clients.GroupExcept(gameAction.LobbyId, currentConnectionId)
                : _hubContext.Clients.Group(gameAction.LobbyId);

            await targetClients.SendAsync(GameHubMethod.GameAction.ToString(), outGameAction);

            return outGameAction;
        }
    }
}