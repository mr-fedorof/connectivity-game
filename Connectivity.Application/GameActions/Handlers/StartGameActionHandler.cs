using System.Linq;
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
        private readonly IGameCardService _gameCardService;

        public StartGameActionHandler(
            ILobbyService lobbyService,
            IGameCardService gameCardService)
        {
            _lobbyService = lobbyService;
            _gameCardService = gameCardService;
        }

        protected override async Task<GameAction<EmptyPayload>> HandleAsync(GameAction<EmptyPayload> gameAction)
        {
            // TODO: Concurrency 
            var lobby = await _lobbyService.GetLobbyAsync(gameAction.LobbyId);

            lobby.Game.Status = GameStatus.Playing;
            lobby.CardDeck = await _gameCardService.GetShuffledDeckAsync();

            await _lobbyService.UpdateLobbyAsync(lobby);

            return gameAction;
        }
    }
}
