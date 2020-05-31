using System;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.CardTaskStartPlayer)]
    public class CardTaskStartPlayerActionHandler : GameActionHandler<CardTaskStartPlayerPayload>
    {
        protected override async Task<GameAction<CardTaskStartPlayerPayload>> HandleAsync(GameAction<CardTaskStartPlayerPayload> gameAction)
        {
            gameAction.Payload.StartedAt = DateTime.UtcNow;

            return gameAction;
        }
    }
}
