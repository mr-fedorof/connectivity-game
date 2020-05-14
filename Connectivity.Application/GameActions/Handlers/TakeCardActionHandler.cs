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
        private readonly ILobbyService _lobbyService;
        private readonly IGameCardService _gameCardService;

        public TakeCardActionHandler(
            ILobbyService lobbyService,
            IGameCardService gameCardService)
        {
            _lobbyService = lobbyService;
            _gameCardService = gameCardService;
        }

        protected override async Task<GameAction<TakeCardPayload>> HandleAsync(GameAction<TakeCardPayload> gameAction)
        {
            var lobby = await _lobbyService.GetLobbyAsync(gameAction.LobbyId);

            var cardType = GetCardType(gameAction.Payload.DiceValue);
            var cardId = await _gameCardService.GetRandomCardFromDeckAsync(cardType, lobby.CardDeck);

            await _lobbyService.UpdateLobbyAsync(lobby);

            gameAction.Payload.GameCard = await _gameCardService.GetCardByIdAsync(cardId);

            return gameAction;
        }

        private CardType GetCardType(int? diceValue)
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
