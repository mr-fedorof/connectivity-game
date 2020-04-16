using System;
using System.Linq;
using Connectivity.Domain.Models;
using Connectivity.Persistence;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Connectivity.Application.Interfaces;

namespace Connectivity.Application.Services
{
    public class LobbyService : ILobbyService
    {
        private readonly ConnectivityDbContext _context;

        public LobbyService(ConnectivityDbContext context)
        {
            _context = context;

            // TODO: Move to any other place
            _context.Database.EnsureCreated();
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
            lobby.Id = Guid.NewGuid().ToString();

            foreach (var team in lobby.Teams)
            {
                team.Id = Guid.NewGuid().ToString();
            }

            _context.Lobbies.Add(lobby);
            await _context.SaveChangesAsync();

            return lobby;
        }

        public async Task<Lobby> UpdateLobbyAsync(Lobby lobby)
        {
            _context.Lobbies.Update(lobby);
            
            await _context.SaveChangesAsync();

            return lobby;
        }

        public async Task<Player> JoinLobbyAsync(string lobbyId, Player player)
        {
            var lobby = await GetLobbyAsync(lobbyId);

            var playerInLobby = lobby.Players.FirstOrDefault(p =>
                string.Equals(p.Name, player.Name, StringComparison.InvariantCultureIgnoreCase));

            if (playerInLobby != null)
            {
                return playerInLobby;
            }

            player.Id = Guid.NewGuid().ToString();

            lobby.Players.Add(player);

            _context.Lobbies.Update(lobby);
            await _context.SaveChangesAsync();

            return player;
        }

        public async Task LeaveLobbyAsync(string lobbyId, string playerId)
        {
            var lobby = await GetLobbyAsync(lobbyId);

            var playerInLobby = lobby.Players.FirstOrDefault(p =>
                string.Equals(p.Id, playerId, StringComparison.InvariantCultureIgnoreCase));

            if (playerInLobby == null)
            {
                return;
            }

            lobby.Players.Remove(playerInLobby);

            _context.Lobbies.Update(lobby);
            await _context.SaveChangesAsync();
        }
    }
}