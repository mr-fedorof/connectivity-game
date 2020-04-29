using System.Threading.Tasks;
using Connectivity.Domain.Models;

namespace Connectivity.Application.Services.Interfaces
{
    public interface ILobbyService
    {
        Task<Lobby> GetLobbyAsync(string lobbyId);

        Task<Lobby> CreateLobbyAsync(Lobby lobby);

        Task<Lobby> UpdateLobbyAsync(Lobby lobby);

        Task<Player> JoinLobbyAsync(string lobbyId, Player player);

        Task LeaveLobbyAsync(string lobbyId, string playerId);
    }
}