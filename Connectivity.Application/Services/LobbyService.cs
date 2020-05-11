using System;
using System.Linq;
using Connectivity.Domain.Models;
using Connectivity.Persistence;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Connectivity.Application.Services
{
    public class LobbyService : ILobbyService
    {
        private readonly ConnectivityDbContext _context;
        private readonly IGameCardService _gameCardService;

        public LobbyService(
            ConnectivityDbContext context,
            IGameCardService gameCardService
            )
        {
            _context = context;
            _gameCardService = gameCardService;
        }

        public async Task<Lobby> GetLobbyAsync(string lobbyId)
        {
            var lobby = await _context.Lobbies.FirstOrDefaultAsync(o => o.Id == lobbyId);

            return lobby;
        }

        public async Task<Lobby> CreateLobbyAsync(Lobby lobby)
        {
            lobby.Id = Guid.NewGuid().ToString();

            foreach (var team in lobby.Teams)
            {
                team.Id = Guid.NewGuid().ToString();
            }

            lobby.Game = new Game
            {
                Status = GameStatus.WaitingForPlayers
            };

            lobby.CardIds = _gameCardService.GetLobbyCards();

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