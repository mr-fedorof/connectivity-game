using System.Collections.Generic;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models;
using Connectivity.Domain.Models.Cards;

namespace Connectivity.Application.Services.Interfaces
{
    public interface IGameCardService
    {
        Task<List<Card>> GetAllCardsAsync();

        Task<Card> GetCardByIdAsync(string id);

        Task AddCardAsync(Card card);

        Task UpdateCardAsync(Card card);

        Task DeleteAllCardsAsync();

        Task SaveCardsAsync(List<Card> cards);

        Task<CardDeck> GetShuffledDeckAsync();

        Task<string> GetRandomCardFromDeckAsync(CardType cardType, CardDeck cardDeck);
    }
}