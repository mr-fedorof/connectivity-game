using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.StartGame)]
    public class StartGameActionHandler : GameActionHandler<EmptyPayload>
    {
        private readonly ILobbyService _lobbyService;

        public StartGameActionHandler(ILobbyService lobbyService)
        {
            _lobbyService = lobbyService;
        }

        protected override async Task<GameAction<EmptyPayload>> HandleAsync(GameAction<EmptyPayload> gameAction)
        {
            // TODO: Concurrency 
            var lobby = await _lobbyService.GetLobbyAsync(gameAction.LobbyId);

            lobby.Game.Status = GameStatus.Playing;

            await _lobbyService.UpdateLobbyAsync(lobby);

            return gameAction;
        }
    }
}
