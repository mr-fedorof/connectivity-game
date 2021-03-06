﻿using System;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.TakeCardPlayer)]
    public class TakeCardActionHandler : GameActionHandler<TakeCardPayload>
    {
        private readonly IGameService _gameService;

        public TakeCardActionHandler(IGameService gameService)
        {
            _gameService = gameService;
        }

        protected override async Task<GameAction<TakeCardPayload>> HandleAsync(GameAction<TakeCardPayload> gameAction)
        {
            var card = await _gameService.GetCardFromDeckAsync(gameAction.LobbyId, gameAction.Payload.GameCardType);

            gameAction.Payload.GameCard = card;

            return gameAction;
        }
    }
}
