using Connectivity.Domain.Models;
using Connectivity.Domain.Models.Cards;
using MongoDB.Driver;

namespace Connectivity.Persistence.DbClients
{
    public interface IConnectivityDbClient
    {
        public IMongoCollection<Lobby> Lobbies { get; }

        public IMongoCollection<Card> GameCards { get; }
    }
}