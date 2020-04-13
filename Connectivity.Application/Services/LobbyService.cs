using System;
using Connectivity.Domain.Models;
using Connectivity.Persistence;
using Microsoft.Extensions.Caching.Memory;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Connectivity.Application.Services
{
    public class LobbyService : ILobbyService
    {
        private readonly ConnectivityDbContext _context;

        public LobbyService(ConnectivityDbContext context)
        {
            _context = context;
        }

        public async Task<Lobby> GetLobbyAsync(string lobbyId)
        {
            var lobby = await _context.Lobbies.FirstOrDefaultAsync(o => o.Id == lobbyId);
            if (lobby == null)
            {
                return null;
            }

            return lobby;
        }

        public async Task<Lobby> CreateLobbyAsync(Lobby lobby)
        {
            // TODO: Move to any other place
            _context.Database.EnsureCreated();

            lobby.Id = Guid.NewGuid().ToString();

            foreach (var team in lobby.Teams)
            {
                team.Id = Guid.NewGuid().ToString();
            }

            _context.Lobbies.Add(lobby);
            await _context.SaveChangesAsync();

            return lobby;
        }
    }
}