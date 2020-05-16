using Connectivity.Domain.Models;
using Connectivity.Domain.Models.Cards;
using Connectivity.Persistence.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Connectivity.Persistence.DbClients
{
    public class ConnectivityDbClient : IConnectivityDbClient
    {
        public IMongoCollection<Lobby> Lobbies { get; }
        
        public IMongoCollection<Card> GameCards { get; }

        public ConnectivityDbClient(IOptions<MongoDbSettings> mongoDbOptions)
        {
            var mongoDbSettings = mongoDbOptions.Value;

            // Doesn't connect/create/update DB, only uses representation

            var client = new MongoClient(mongoDbSettings.ConnectionString);

            var database = client.GetDatabase(mongoDbSettings.DatabaseName);

            Lobbies = database.GetCollection<Lobby>("lobbies");
            GameCards = database.GetCollection<Card>("game-cards");
        }
    }
}