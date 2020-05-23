using System;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.DrawingStart)]
    public class DrawingStartActionHandler : GameActionHandler<EmptyPayload>
    {

        protected override async Task<GameAction<EmptyPayload>> HandleAsync(GameAction<EmptyPayload> gameAction)
        {
            return gameAction;
        }
    }
}
