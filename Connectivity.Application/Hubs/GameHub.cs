using System;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Payloads;
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

        public async Task<LobbyConnectResult> ConnectToLobby(Guid lobbyId)
        {
            var result = await _gameHubService.ConnectToLobbyAsync(Context.ConnectionId, lobbyId);

            return result; 
        }

        public async Task<GameAction> GameAction(GameAction gameAction)
        {
            var result = await _gameHubService.ProcessGameActionAsync(Context.ConnectionId, gameAction);

            return result;
        }

        public async Task DrawAction(Guid lobbyId, DrawAction drawAction)
        {
            await _gameHubService.ProcessDrawActionAsync(Context.ConnectionId, lobbyId, drawAction);
        }

        public async Task RestoreDrawActions(Guid lobbyId)
        {
            await _gameHubService.RestoreDrawActionsAsync(Context.ConnectionId, lobbyId);
        }
    }
}
