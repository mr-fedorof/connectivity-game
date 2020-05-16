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
        private readonly IGameService _gameService;
        private readonly IGameCardDeckService _cardDeckService;

        public StartGameActionHandler(
            IGameService gameService,
            IGameCardDeckService cardDeckService)
        {
            _gameService = gameService;
            _cardDeckService = cardDeckService;
        }

        protected override async Task<GameAction<EmptyPayload>> HandleAsync(GameAction<EmptyPayload> gameAction)
        {
            // TODO: Add check if status is already in Playing status

            var cardDeck = await _cardDeckService.GetShuffledDeckAsync();

            await _gameService.SetGameStatusAsync(gameAction.LobbyId, GameStatus.Playing);
            await _gameService.SetCardDeckAsync(gameAction.LobbyId, cardDeck);

            return gameAction;
        }
    }
}
