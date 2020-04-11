using System.Threading.Tasks;
using Connectivity.WebApi.Models;

namespace Connectivity.WebApi.Services
{
    public interface ILobbyService
    {
        Task<Lobby> GetLobbyAsync(string lobbyId);

        Task<Lobby> CreateLobbyAsync(Lobby lobby);
    }
}