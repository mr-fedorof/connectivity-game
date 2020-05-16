﻿using System;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models.Cards;

namespace Connectivity.Application.Services.Interfaces
{
    public interface IGameService
    {
        Task SetGameStatusAsync(Guid lobbyId, GameStatus status);

        Task<CardDeck> GetCardDeckAsync(Guid lobbyId);

        Task SetCardDeckAsync(Guid lobbyId, CardDeck cardDeck);

        Task<Card> GetCardFromDeckAsync(Guid lobbyId, CardType cardType);
    }
}