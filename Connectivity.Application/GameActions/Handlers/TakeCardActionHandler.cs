using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Timers;
using Connectivity.Application.Extensions;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;
using Connectivity.Domain.Models.Cards;
using Microsoft.Extensions.Logging;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.TakeCardPlayer)]
    public class TakeCardActionHandler : GameActionHandler<TakeCardPayload>
    {
        private readonly ILobbyService _lobbyService;
        private readonly IGameCardService _gameCardService;
        private readonly ILogger<TakeCardActionHandler> _logger;

        public TakeCardActionHandler(
            ILobbyService lobbyService,
            IGameCardService gameCardService, ILogger<TakeCardActionHandler> logger)
        {
            _lobbyService = lobbyService;
            _gameCardService = gameCardService;
            _logger = logger;
        }

        protected override async Task<GameAction<TakeCardPayload>> HandleAsync(GameAction<TakeCardPayload> gameAction)
        {
            var sw = Stopwatch.StartNew();
            sw.Start();
            _logger.LogInformation($"Start take card");
            var lobby = await _lobbyService.GetLobbyAsync(gameAction.LobbyId);
            _logger.LogInformation($"GetLobbyAsync elapsed {sw.Elapsed}");

            sw.Restart();
            var cardId = _gameCardService.TakeFromDeckCardIdByDiceValue(gameAction.Payload.DiceValue, lobby.CardDeck);

            _logger.LogInformation($"Pop card elapsed {sw.Elapsed}");

            sw.Restart();
            await _lobbyService.UpdateLobbyAsync(lobby);
            _logger.LogInformation($"UpdateLobbyAsync elapsed {sw.Elapsed}");

            sw.Restart();
            gameAction.Payload.GameCard = await _gameCardService.GetCardByIdAsync(cardId);
            _logger.LogInformation($"GetCardByIdAsync elapsed {sw.Elapsed}");

            return gameAction;
        }
    }
}
