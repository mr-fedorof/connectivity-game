﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models;
using Connectivity.Domain.Models.Cards;

namespace Connectivity.Application.Services.Interfaces
{
    public interface IGameCardService
    {
        List<Card> GetAllCardsAsync();

        LobbyCards GetLobbyCards();

        Task<Card> GetCardByIdAsync(string id);

        Task SaveCardAsync(Card card);

        Task UpdateCardAsync(Card card);

        Task DeleteAllCardsAsync();

        Task SaveCardsAsync(List<Card> cards);
    }
}