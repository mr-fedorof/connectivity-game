using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Models.Cards;
using Connectivity.Persistence.DbClients;
using MongoDB.Driver;

namespace Connectivity.Application.Services
{
    public class GameCardService : IGameCardService
    {
        private readonly IConnectivityDbClient _dbClient;

        public GameCardService(IConnectivityDbClient dbClient)
        {
            _dbClient = dbClient;
        }

        public async Task<List<Card>> GetAllCardsAsync()
        {
            var cursor = await _dbClient.GameCards.FindAsync(_ => true);
            var gameCards = await cursor.ToListAsync();

            return gameCards;
        }

        public async Task<Card> GetCardByIdAsync(Guid id)
        {
            var cursor = await _dbClient.GameCards.FindAsync(_ => _.Id == id);
            var gameCard = await cursor.FirstOrDefaultAsync();

            return gameCard;
        }

        public async Task AddCardAsync(Card card)
        {
            card.Id = Guid.NewGuid();
            
            await _dbClient.GameCards.InsertOneAsync(card);
        }

        public async Task UpdateCardAsync(Card card)
        {
            await _dbClient.GameCards.FindOneAndReplaceAsync(_ => _.Id == card.Id, card);
        }

        public async Task DeleteAllCardsAsync()
        {
            await _dbClient.GameCards.DeleteManyAsync(_ => true);
        }

        public async Task SaveCardsAsync(List<Card> cards)
        {
            cards.ForEach(card =>
            {
                card.Id = Guid.NewGuid();
            });

            await _dbClient.GameCards.InsertManyAsync(cards);
        }
    }
}