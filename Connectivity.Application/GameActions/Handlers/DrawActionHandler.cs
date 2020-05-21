using System;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.Draw)]
    public class DrawActionHandler : GameActionHandler<DrawPayload>
    {
        protected override async Task<GameAction<DrawPayload>> HandleAsync(GameAction<DrawPayload> gameAction)
        {
            // TODO: caching here?
            // if payload.Erase == true, clear cache?

            return gameAction;
        }
    }
}
