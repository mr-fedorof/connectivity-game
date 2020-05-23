using System;
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

        void DrawMove(string currentConnectionId, string lobbyId, DrawPayload drawPayload);

        Task RestoreDrawings(string currentConnectionId, string lobbyId);
    }
}