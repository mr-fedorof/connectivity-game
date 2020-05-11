using System;
using System.Threading.Tasks;
using Connectivity.Application.Extensions;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;
using Connectivity.Domain.Models.Cards;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.TakeCardPlayer)]
    public class TakeCardActionHandler : GameActionHandler<TakeCardPayload>
    {
        private readonly ILobbyService _lobbyService;
        private readonly IGameCardService _gameCardService;

        public TakeCardActionHandler(
            ILobbyService lobbyService, 
            IGameCardService gameCardService
            )
        {
            _lobbyService = lobbyService;
            _gameCardService = gameCardService;
        }

        protected override async Task<GameAction<TakeCardPayload>> HandleAsync(GameAction<TakeCardPayload> gameAction)
        {
            var lobby = await _lobbyService.GetLobbyAsync(gameAction.LobbyId);

            string cardId;
            switch (gameAction.Payload.DiceValue)
            {
                case 1:
                    cardId = lobby.CardIds.Alias.Pop();
                    break;
                case 2:
                    cardId = lobby.CardIds.Taboo.Pop();
                    break;
                case 3:
                    cardId = lobby.CardIds.Draw.Pop();
                    break;
                case 4:
                    cardId = lobby.CardIds.Crocodile.Pop();
                    break;
                case 5:
                    cardId = lobby.CardIds.WhoAmI.Pop();
                    break;
                case 6:
                    cardId = lobby.CardIds.Joker.Pop();
                    break;
                default:
                    throw new NotSupportedException();
            }

            await _lobbyService.UpdateLobbyAsync(lobby);

            gameAction.Payload.GameCard = await _gameCardService.GetCardByIdAsync(cardId);

            return gameAction;
        }
    }
}
