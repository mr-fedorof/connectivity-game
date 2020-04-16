using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Connectivity.Application.GameActions.Attributes;
using Connectivity.Application.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Payloads;
using Microsoft.Extensions.Options;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.JoinTeamPlayer)]
    public class JoinTeamPlayerActionHandler : GameActionHandler<JoinTeamPlayerPayload>
    {
        private readonly ILobbyService _lobbyService;

        public JoinTeamPlayerActionHandler(
            IOptions<JsonSerializerOptions> jsonSerializerOptions,
            ILobbyService lobbyService)
            : base(jsonSerializerOptions)
        {
            _lobbyService = lobbyService;
        }

        protected override async Task<GameActionResponse<JoinTeamPlayerPayload>> HandleAsync(GameAction<JoinTeamPlayerPayload> gameAction)
        {
            var lobby = await _lobbyService.GetLobbyAsync(gameAction.LobbyId);

            var player = lobby.Players.First(p => p.Id == gameAction.PlayerId);

            player.TeamId = gameAction.Payload.TeamId;

            await _lobbyService.UpdateLobbyAsync(lobby);

            return new GameActionResponse<JoinTeamPlayerPayload>(gameAction);
        }
    }
}
