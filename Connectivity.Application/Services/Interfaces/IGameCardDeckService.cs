using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models.Cards;

namespace Connectivity.Application.Services.Interfaces
{
    public interface IGameCardDeckService
    {
        Task<CardDeck> GetShuffledDeckAsync();

        Task<List<Guid>> GetShuffledCardSetAsync(CardType type);
    }
}