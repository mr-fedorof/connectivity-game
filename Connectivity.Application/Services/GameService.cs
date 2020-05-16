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
    public class GameService : IGameService
    {
        private readonly IConnectivityDbClient _dbClient;
        private readonly IGameCardService _cardService;
        private readonly IGameCardDeckService _cardDeckService;

        public GameService(
            IConnectivityDbClient dbClient,
            IGameCardService cardService,
            IGameCardDeckService cardDeckService)
        {
            _dbClient = dbClient;
            _cardService = cardService;
            _cardDeckService = cardDeckService;
        }

        public async Task SetGameStatusAsync(Guid lobbyId, GameStatus status)
        {
            await _dbClient.Lobbies.UpdateOneAsync(
                _ => _.Id == lobbyId,
                Builders<Lobby>.Update.Set(_ => _.Game.Status, status)
            );
        }

        public async Task<CardDeck> GetCardDeckAsync(Guid lobbyId)
        {
            var cursor = await _dbClient.Lobbies.FindAsync(
                Builders<Lobby>.Filter.Eq(_ => _.Id, lobbyId),
                new FindOptions<Lobby, CardDeck>
                {
                    Projection = Builders<Lobby>.Projection.Expression(_ => _.Game.CardDeck)
                }
            );

            var cardDeck = await cursor.FirstOrDefaultAsync();

            return cardDeck;
        }

        public async Task SetCardDeckAsync(Guid lobbyId, CardDeck cardDeck)
        {
            await _dbClient.Lobbies.UpdateOneAsync(
                _ => _.Id == lobbyId,
                Builders<Lobby>.Update.Set(_ => _.Game.CardDeck, cardDeck)
            );
        }

        public async Task<Card> GetCardFromDeckAsync(Guid lobbyId, CardType cardType)
        {
            var cardDeck = await GetCardDeckAsync(lobbyId);

            var cardId = cardDeck.TakeCard(cardType);
            
            // Reshuffle cards for the card type in the deck
            if (cardId == null)
            {
                var newCardSet = await _cardDeckService.GetShuffledCardSetAsync(cardType);

                cardDeck[cardType] = newCardSet;

                cardId = cardDeck.TakeCard(cardType);
            }
            
            if (cardId == null)
            {
                throw new Exception("Card deck is empty.");
            }

            await SetCardDeckAsync(lobbyId, cardDeck);

            var card = await _cardService.GetCardByIdAsync(cardId.Value);
            if (card == null)
            {
                throw new Exception($"Card {cardId} does not exist.");
            }

            return card;
        }
    }
}