using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Payloads;
using Connectivity.Domain.Models;

namespace Connectivity.Application.Services.Interfaces
{
    public interface IGameHubService
    {
        Task<LobbyConnectResult> ConnectToLobbyAsync(string currentConnectionId, Guid lobbyId);

        Task<GameAction> ProcessGameActionAsync(string currentConnectionId, GameAction gameAction);

        Task<GameAction> ProcessGameActionAsync<T>(string currentConnectionId, GameAction<T> gameActionT)
            where T : class;

        Task ProcessDrawActionAsync(string currentConnectionId, Guid lobbyId, DrawAction drawAction);

        Task<List<DrawAction>> RestoreDrawActionsAsync(string currentConnectionId, Guid lobbyId);
    }
}