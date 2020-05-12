using System;
using System.Collections.Generic;
using System.Linq;
using Connectivity.Domain.Models;
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
        private const int CardsInDeck = 100;
        private readonly CardsDbContext _context;

        public GameCardService(CardsDbContext context)
        {
            _context = context;
            _context.Database.EnsureCreated();
        }

        public List<Card> GetAllCardsAsync()
        {
            return _context.Cards.ToList();
        }

        public async Task<Card> GetCardByIdAsync(string id)
        {
            var card = await _context.Cards.FirstOrDefaultAsync(o => o.Id == id);
            return card;
        }

        public CardDeck ShuffleCards()
        {
            // TODO: if count of cards need to be restricted, better to do that here
            var lobbyCards = new CardDeck
            {
                {CardType.Alias, GetRandomizedCardIdsByType(CardType.Alias)},
                {CardType.Taboo, GetRandomizedCardIdsByType(CardType.Taboo)},
                {CardType.Draw, GetRandomizedCardIdsByType(CardType.Draw)},
                {CardType.Crocodile, GetRandomizedCardIdsByType(CardType.Crocodile)},
                {CardType.WhoAmI, GetRandomizedCardIdsByType(CardType.WhoAmI)},
                {CardType.Joker, GetRandomizedCardIdsByType(CardType.Joker)},
            };

            return lobbyCards;
        }

        public async Task SaveCardAsync(Card card)
        {
            card.Id = Guid.NewGuid().ToString();
            card.Task.Id = Guid.NewGuid().ToString();
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
            _context.Cards.RemoveRange(_context.Cards);
            await _context.SaveChangesAsync();
        }

        public async Task SaveCardsAsync(List<Card> cards)
        {
            
            foreach (var card in cards)
            {
                card.Id = Guid.NewGuid().ToString();
                card.Task.Id = Guid.NewGuid().ToString();
            }

            _context.Cards.AddRange(cards);
            await _context.SaveChangesAsync();
        }

        public List<string> GetRandomizedCardIdsByType(CardType type)
        {
            var cards = _context.Cards
                .Where(card => card.Type == type)
                .Select(card => card.Id).ToList();

            cards.Shuffle();

            return cards.Take(CardsInDeck).ToList();
        }

        public string TakeFromDeckCardIdByDiceValue(int diceValue, CardDeck cardDeck)
        {
            var cardType = GetCardTypeByDice(diceValue);
            var cardId = cardDeck.TryGetCardValue(cardType);

            if (cardId != null)
            {
                return cardId;
            }

            var newCardDeck = GetRandomizedCardIdsByType(cardType);
            cardDeck.Remove(cardType);
            cardDeck.TryAdd(cardType, newCardDeck);

            cardId = cardDeck.TryGetCardValue(cardType);

            return cardId;
        }


        private CardType GetCardTypeByDice(int diceValue)
        {
            //TODO: add error handling or trusted cast?
            return (CardType)diceValue;
        }
    }
}