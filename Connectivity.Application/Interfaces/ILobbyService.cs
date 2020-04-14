using System.Threading.Tasks;
using Connectivity.Domain.Models;

namespace Connectivity.Application.Interfaces
{
    public interface ILobbyService
    {
        Task<Lobby> GetLobbyAsync(string lobbyId);

        Task<Lobby> CreateLobbyAsync(Lobby lobby);
    }
}