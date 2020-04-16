using Connectivity.Application.GameActions.Attributes;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.NewPlayer)]
    public class NewPlayerActionHandler : GameActionHandler<NewPlayerPayload>
    {
    }
}
