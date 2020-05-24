using System;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.CardTaskStartGame)]
    public class CardTaskStartActionHandler : GameActionHandler<CardTaskStartPayload>
    {
        protected override async Task<GameAction<CardTaskStartPayload>> HandleAsync(GameAction<CardTaskStartPayload> gameAction)
        {
            gameAction.Payload.StartedAt = DateTime.UtcNow;

            if (gameAction.Payload.GameCardType == CardType.Draw)
            {
                gameAction.Type = GameActionType.DrawingStart;
            }


            return gameAction;
        }
    }
}
