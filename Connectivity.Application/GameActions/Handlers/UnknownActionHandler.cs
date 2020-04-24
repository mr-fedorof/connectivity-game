using System.Text.Json;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;
using Microsoft.Extensions.Options;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.Unknown)]
    public class UnknownActionHandler : GameActionHandler<JoinTeamPlayerPayload>
    {
        public UnknownActionHandler(
            IOptions<JsonSerializerOptions> jsonSerializerOptions)
            : base(jsonSerializerOptions)
        {
        }

        protected override async Task<GameAction<JoinTeamPlayerPayload>> HandleAsync(GameAction<JoinTeamPlayerPayload> gameAction)
        {
            return gameAction;
        }
    }
}
