using System;
using System.Collections.Generic;
using System.Linq;
using Connectivity.Persistence;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models.Cards;
using Microsoft.EntityFrameworkCore;
using Connectivity.Application.Extensions;

namespace Connectivity.Application.Services
{
    public class GameCardService : IGameCardService
    {
        private const int DeckSize = 100;

        private readonly ConnectivityDbContext _context;

        public GameCardService(ConnectivityDbContext context)
        {
            _context = context;
        }

        public async Task<List<Card>> GetAllCardsAsync()
        {
            return await _context.Cards.ToListAsync();
        }

        public async Task<Card> GetCardByIdAsync(string id)
        {
            var card = await _context.Cards.FirstOrDefaultAsync(o => o.Id == id);

            return card;
        }

        public async Task AddCardAsync(Card card)
        {
            card.Id = Guid.NewGuid().ToString();

            _context.Cards.Add(card);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateCardAsync(Card card)
        {
            _context.Cards.Update(card);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAllCardsAsync()
        {
            var cards = await _context.Cards.ToListAsync();

            _context.Cards.RemoveRange(cards);

            await _context.SaveChangesAsync();
        }

        public async Task SaveCardsAsync(List<Card> cards)
        {
            cards.ForEach(card =>
            {
                card.Id = Guid.NewGuid().ToString();
            });

            _context.Cards.AddRange(cards);

            await _context.SaveChangesAsync();
        }

        // TODO: Extract to GameCardDeckService
        public async Task<CardDeck> GetShuffledDeckAsync()
        {
            var cardDeck = new CardDeck
            {
                { CardType.Alias, await GetShuffledCardSetAsync(CardType.Alias, DeckSize) },
                { CardType.Taboo, await GetShuffledCardSetAsync(CardType.Taboo, DeckSize) },
                { CardType.Draw, await GetShuffledCardSetAsync(CardType.Draw, DeckSize) },
                { CardType.Crocodile, await GetShuffledCardSetAsync(CardType.Crocodile, DeckSize) },
                { CardType.WhoAmI, await GetShuffledCardSetAsync(CardType.WhoAmI, DeckSize) },
                { CardType.Joker, await GetShuffledCardSetAsync(CardType.Joker, DeckSize) },
            };

            return cardDeck;
        }

        // TODO: Extract to GameCardDeckService
        public async Task<List<string>> GetShuffledCardSetAsync(CardType type, int count)
        {
            var cards = await _context.Cards
                .Where(card => card.Type == type)
                .Select(card => card.Id)
                .ToListAsync();

            cards.Shuffle();

            var slicedCards = cards
                .Take(count)
                .ToList();

            return slicedCards;
        }

        // TODO: Extract to GameCardDeckService
        public async Task<string> GetRandomCardFromDeckAsync(CardType cardType, CardDeck cardDeck)
        {
            var cardId = cardDeck.TryGetCardValue(cardType);
            if (cardId != null)
            {
                return cardId;
            }

            var newCardDeck = await GetShuffledCardSetAsync(cardType, DeckSize);

            cardDeck.Remove(cardType);
            cardDeck.TryAdd(cardType, newCardDeck);

            cardId = cardDeck.TryGetCardValue(cardType);

            return cardId;
        }
    }
}