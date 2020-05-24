using System;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.NextPlayerGame)]
    public class NextPlayerActionHandler : GameActionHandler<NextPlayerPayload>
    {
        private readonly IGameRisovachService _gameRisovachService;

        public NextPlayerActionHandler(
            IGameRisovachService gameRisovachService)
        {
            _gameRisovachService = gameRisovachService;
        }
        protected override async Task<GameAction<NextPlayerPayload>> HandleAsync(GameAction<NextPlayerPayload> gameAction)
        {
            await _gameRisovachService.DeleteDrawActionsAsync(gameAction.LobbyId);

            return gameAction;
        }
    }
}
