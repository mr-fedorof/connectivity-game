using System;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.CardReadingStartPlayer)]
    public class CardReadingStartActionHandler : GameActionHandler<CardReadingStartPayload>
    {
        protected override async Task<GameAction<CardReadingStartPayload>> HandleAsync(GameAction<CardReadingStartPayload> gameAction)
        {
            gameAction.Payload.StartedAt = DateTime.UtcNow;

            return gameAction;
        }
    }
}
