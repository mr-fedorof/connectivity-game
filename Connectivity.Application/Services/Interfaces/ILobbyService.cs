using System;
using System.Threading.Tasks;
using Connectivity.Domain.Models;

namespace Connectivity.Application.Services.Interfaces
{
    public interface ILobbyService
    {
        Task<Lobby> GetLobbyAsync(Guid lobbyId);

        Task<Lobby> CreateLobbyAsync(Lobby lobby);

        Task<Player> JoinLobbyAsync(Guid lobbyId, Player player);

        Task LeaveLobbyAsync(Guid lobbyId, Guid playerId);
    }
}