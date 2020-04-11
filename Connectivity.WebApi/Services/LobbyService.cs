using System;
using System.Threading.Tasks;
using Connectivity.WebApi.Models;
using Microsoft.Extensions.Caching.Memory;

namespace Connectivity.WebApi.Services
{
    public class LobbyService : ILobbyService
    {
        private readonly IMemoryCache _memoryCache;

        public LobbyService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public async Task<Lobby> GetLobbyAsync(string lobbyId)
        {
            var lobby = _memoryCache.Get<Lobby>(lobbyId);
            if (lobby == null)
            {
                return null;
            }

            return lobby;
        }

        public async Task<Lobby> CreateLobbyAsync(Lobby lobby)
        {
            lobby.Id = Guid.NewGuid().ToString();

            foreach (var team in lobby.Teams)
            {
                team.Id = Guid.NewGuid().ToString();
            }

            _memoryCache.Set<Lobby>(lobby.Id, lobby);

            return lobby;
        }
    }
}