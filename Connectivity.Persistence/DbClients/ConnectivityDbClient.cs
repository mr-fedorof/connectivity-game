using System.Threading.Tasks;
using Connectivity.Domain.Models;
using Connectivity.Domain.Models.Cards;
using Connectivity.Persistence.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace Connectivity.Persistence.DbClients
{
    public class ConnectivityDbClient : IConnectivityDbClient
    {
        private readonly MongoDbSettings _dbSettings;

        public IMongoCollection<Lobby> Lobbies { get; private set; }
        
        public IMongoCollection<Card> GameCards { get; private set; }

        public ConnectivityDbClient(IOptions<MongoDbSettings> mongoDbOptions)
        {
            _dbSettings = mongoDbOptions.Value;
        }

        public async Task InitializeAsync()
        {
            SetCamelCaseElementNameConvention();

            var client = new MongoClient(_dbSettings.ConnectionString);

            var database = client.GetDatabase(_dbSettings.DatabaseName);

            Lobbies = database.GetCollection<Lobby>("lobbies");
            GameCards = database.GetCollection<Card>("game-cards");

            // Lobby indexes

            var lobbyIdIndex = Builders<Lobby>.IndexKeys
                .Ascending(_ => _.Id);

            await Lobbies.Indexes.CreateOneAsync(new CreateIndexModel<Lobby>(lobbyIdIndex));

            // Card indexes

            var gameCardsIdIndex = Builders<Card>.IndexKeys
                .Ascending(_ => _.Id);

            var gameCardsTypeIndex = Builders<Card>.IndexKeys
                .Ascending(_ => _.Type);

            await GameCards.Indexes.CreateManyAsync(new []
            {
                new CreateIndexModel<Card>(gameCardsIdIndex),
                new CreateIndexModel<Card>(gameCardsTypeIndex)
            });
        }

        private void SetCamelCaseElementNameConvention()
        {
            var conventionPack = new ConventionPack
            {
                new CamelCaseElementNameConvention()
            };

            ConventionRegistry.Register("camelCase", conventionPack, t => true);
        }
    }
}