using System;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.DrawingEnd)]
    public class DrawingEndActionHandler : GameActionHandler<EmptyPayload>
    {
        private readonly IGameService _gameService;

        public DrawingEndActionHandler(
            IGameService gameService)
        {
            _gameService = gameService;
        }
        protected override async Task<GameAction<EmptyPayload>> HandleAsync(GameAction<EmptyPayload> gameAction)
        {
            await _gameService.DeleteDrawings(gameAction.LobbyId.ToString());
            return gameAction;
        }
    }
}
