using System;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.ReadyToStartGame)]
    public class ReadyToStartGameActionHandler : GameActionHandler<ReadyToStartGamePayload>
    {
        protected override async Task<GameAction<ReadyToStartGamePayload>> HandleAsync(GameAction<ReadyToStartGamePayload> gameAction)
        {
            gameAction.Payload.ReadyToStartAt = DateTime.UtcNow;

            return gameAction;
        }
    }
}
