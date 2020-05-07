using System.Collections.Generic;
using System.Threading.Tasks;
using Connectivity.Domain.Models;
using Connectivity.Domain.Models.Cards;

namespace Connectivity.Application.Services.Interfaces
{
    public interface IGameCardsService
    {
        List<Card> GetAllCardsAsync();

        Task<Card> GetCardAsync(string id);

        Task SaveCardAsync(Card card);

        Task UpdateCardAsync(Card card);

        Task DeleteAllCardsAsync();

        Task SaveCardsAsync(List<Card> cards);
    }
}