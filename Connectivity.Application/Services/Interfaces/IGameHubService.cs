using System.Threading.Tasks;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.Models;

namespace Connectivity.Application.Services.Interfaces
{
    public interface IGameHubService
    {
        Task<LobbyConnectResult> ConnectToLobbyAsync(string currentConnectionId, string lobbyId);

        Task<GameAction> ProcessGameActionAsync(string currentConnectionId, GameAction gameAction);

        Task<GameAction> ProcessGameActionAsync<T>(string currentConnectionId, GameAction<T> gameActionT)
            where T : class;
    }
}