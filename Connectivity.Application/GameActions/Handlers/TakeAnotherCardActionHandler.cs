using System;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.TakeAnotherCardPlayer)]
    public class TakeAnotherCardActionHandler : GameActionHandler<TakeAnotherCardPayload>
    {
        private readonly IGameService _gameService;

        public TakeAnotherCardActionHandler(
            IGameService gameService)
        {
            _gameService = gameService;
        }

        protected override async Task<GameAction<TakeAnotherCardPayload>> HandleAsync(GameAction<TakeAnotherCardPayload> gameAction)
        {
            var card = await _gameService.GetCardFromDeckAsync(gameAction.LobbyId, gameAction.Payload.GameCardType);

            gameAction.Payload.GameCard = card;

            return gameAction;
        }
    }
}
