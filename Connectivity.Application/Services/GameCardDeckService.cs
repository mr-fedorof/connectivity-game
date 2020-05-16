using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Extensions;
using Connectivity.Domain.Models.Cards;
using Connectivity.Persistence.DbClients;
using MongoDB.Driver;

namespace Connectivity.Application.Services
{
    public class GameCardDeckService : IGameCardDeckService
    {
        private const int DeckSize = 100;

        private readonly IConnectivityDbClient _dbClient;

        public GameCardDeckService(IConnectivityDbClient dbClient)
        {
            _dbClient = dbClient;
        }

        public async Task<CardDeck> GetShuffledDeckAsync()
        {
            var cardDeck = new CardDeck
            {
                Alias = await GetShuffledCardSetAsync(CardType.Alias),
                Taboo = await GetShuffledCardSetAsync(CardType.Taboo),
                Draw = await GetShuffledCardSetAsync(CardType.Draw),
                Crocodile = await GetShuffledCardSetAsync(CardType.Crocodile),
                WhoAmI = await GetShuffledCardSetAsync(CardType.WhoAmI),
                Joker = await GetShuffledCardSetAsync(CardType.Joker),
            };

            return cardDeck;
        }

        public async Task<List<Guid>> GetShuffledCardSetAsync(CardType type)
        {
            var cursor = await _dbClient.GameCards.FindAsync(
                Builders<Card>.Filter.Eq(_ => _.Type, type),
                new FindOptions<Card, Guid>
                {
                    Projection = Builders<Card>.Projection.Expression(_ => _.Id)
                }
            );

            var cards = await cursor.ToListAsync();

            cards.Shuffle();

            var slicedCards = cards
                .Take(DeckSize)
                .ToList();

            return slicedCards;
        }
    }
}