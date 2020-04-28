using System.Threading.Tasks;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    // Use GameActionTypeAttribute to bind a handler with an action
    // [GameActionType(GameActionType.Example)]
    public class ExampleActionHandler : GameActionHandler<ExamplePayload>
    {
        protected override async Task<GameAction<ExamplePayload>> HandleAsync(GameAction<ExamplePayload> gameAction)
        {
            return gameAction;
        }
    }
}
