using System;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.TakeCardPlayer)]
    public class TakeCardActionHandler : GameActionHandler<TakeCardPayload>
    {
        private readonly IGameService _gameService;
        private readonly ILobbyService _lobbyService;

        private readonly IGameCardService _gameCardService;
        private readonly IGameCardDeckService _gameCardDeckService;

        public TakeCardActionHandler(
            ILobbyService lobbyService,
            IGameCardService gameCardService,
            IGameCardDeckService gameCardDeckService, IGameService gameService)
        {
            _lobbyService = lobbyService;
            _gameCardService = gameCardService;
            _gameCardDeckService = gameCardDeckService;
            _gameService = gameService;
        }

        protected override async Task<GameAction<TakeCardPayload>> HandleAsync(GameAction<TakeCardPayload> gameAction)
        {
            var cardType = GetCardType(gameAction.Payload.DiceValue);

            var card = await _gameService.GetCardFromDeckAsync(gameAction.LobbyId, cardType);

            gameAction.Payload.GameCard = card;

            return gameAction;
        }

        private static CardType GetCardType(int? diceValue)
        {
            switch (diceValue)
            {
                case 1: return CardType.Alias;
                case 2: return CardType.Taboo;
                case 3: return CardType.Draw;
                case 4: return CardType.Crocodile;
                case 5: return CardType.WhoAmI;
                case 6: return CardType.Joker;
            }

            throw new Exception("Dice has to be in [1, 6]");
        }
    }
}
