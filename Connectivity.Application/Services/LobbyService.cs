using System;
using System.Linq;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Models.Cards;
using Connectivity.Persistence.DbClients;
using MongoDB.Driver;

namespace Connectivity.Application.Services
{
    public class LobbyService : ILobbyService
    {
        private readonly IConnectivityDbClient _dbClient;

        public LobbyService(IConnectivityDbClient dbClient)
        {
            _dbClient = dbClient;
        }

        public async Task<Lobby> GetLobbyAsync(Guid lobbyId)
        {
            var cursor = await _dbClient.Lobbies.FindAsync(_ => _.Id == lobbyId);
            var lobby = await cursor.FirstOrDefaultAsync();

            return lobby;
        }

        public async Task<Lobby> CreateLobbyAsync(Lobby lobby)
        {
            lobby.Id = Guid.NewGuid();
            
            foreach (var team in lobby.Teams)
            {
                team.Id = Guid.NewGuid();
            }
            
            lobby.Game = new Game
            {
                Status = GameStatus.WaitingForPlayers
            };
            
            await _dbClient.Lobbies.InsertOneAsync(lobby);
            
            return lobby;
        }

        public async Task<Player> JoinLobbyAsync(Guid lobbyId, Player player)
        {
            var lobby = await GetLobbyAsync(lobbyId);
            
            var playerInLobby = lobby.Players.FirstOrDefault(p => 
                string.Equals(p.Name, player.Name, StringComparison.InvariantCultureIgnoreCase));
            
            if (playerInLobby != null)
            {
                return playerInLobby;
            }

            if (lobby.Game?.Status != GameStatus.WaitingForPlayers)
            {
                throw new Exception("Action is restricted. The waiting for players status is required.");
            }
            
            player.Id = Guid.NewGuid();

            await _dbClient.Lobbies.UpdateOneAsync(
                _ => _.Id == lobbyId,
                Builders<Lobby>.Update.Push(_ => _.Players, player)
            );

            return player;
        }

        public async Task LeaveLobbyAsync(Guid lobbyId, Guid playerId)
        {
            var lobby = await GetLobbyAsync(lobbyId);
            
            var playerInLobby = lobby.Players.FirstOrDefault(_ => _.Id == playerId);
            
            if (playerInLobby == null)
            {
                return;
            }

            await _dbClient.Lobbies.UpdateOneAsync(
                _ => _.Id == lobbyId,
                Builders<Lobby>.Update.PullFilter(_ => _.Players, _ => _.Id == playerId)
            );
        }
    }
}