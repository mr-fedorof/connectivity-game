using System;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.RollDicePlayer)]
    public class RollDiceActionHandler : GameActionHandler<RollDicePayload>
    {
        private static readonly Random RandomGenerator = new Random();

        protected override async Task<GameAction<RollDicePayload>> HandleAsync(GameAction<RollDicePayload> gameAction)
        {
            gameAction.Payload.Value = RandomGenerator.Next(1, 7);

            return gameAction;
        }
    }
}
