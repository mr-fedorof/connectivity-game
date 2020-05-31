using System;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.CardReadingStartGame)]
    public class CardReadingStartGameActionHandler : GameActionHandler<CardReadingStartGamePayload>
    {
        protected override async Task<GameAction<CardReadingStartGamePayload>> HandleAsync(GameAction<CardReadingStartGamePayload> gameAction)
        {
            gameAction.Payload.StartedAt = DateTime.UtcNow;

            return gameAction;
        }
    }
}
