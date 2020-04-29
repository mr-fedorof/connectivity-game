﻿using System.Linq;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Payloads;
using Connectivity.Domain.Models;

using Microsoft.AspNetCore.Mvc;

namespace Connectivity.WebApi.Controllers
{
    [ApiController]
    [Route("api/lobby")]
    public class LobbyController : ControllerBase
    {
        private readonly ILobbyService _lobbyService;
        private readonly IGameHubService _gameHubService;

        public LobbyController(
            ILobbyService lobbyService,
            IGameHubService gameHubService)
        {
            _lobbyService = lobbyService;
            _gameHubService = gameHubService;
        }

        [HttpGet("{lobbyId}")]
        public async Task<IActionResult> GetLobby(string lobbyId)
        {
            var lobby = await _lobbyService.GetLobbyAsync(lobbyId);
            if (lobby == null)
            {
                return NotFound();
            }

            return Ok(lobby);
        }

        [HttpGet("{lobbyId}/exists")]
        public async Task<IActionResult> LobbyExists(string lobbyId)
        {
            var lobby = await _lobbyService.GetLobbyAsync(lobbyId);
            if (lobby == null)
            {
                return Ok(false);
            }

            return Ok(true);
        }

        [HttpGet("{lobbyId}/player/{playerId}/exists")]
        public async Task<IActionResult> PlayerExists(string lobbyId, string playerId)
        {
            var lobby = await _lobbyService.GetLobbyAsync(lobbyId);
            if (lobby?.Players?.Any(p => p.Id == playerId) != true)
            {
                return Ok(false);
            }

            return Ok(true);
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateLobby([FromBody] Lobby lobby)
        {
            var createdLobby = await _lobbyService.CreateLobbyAsync(lobby);

            return Ok(createdLobby);
        }

        [HttpPost("{lobbyId}/join")]
        public async Task<IActionResult> JoinLobby(string lobbyId, [FromBody] Player player)
        {
            var createdPlayer = await _lobbyService.JoinLobbyAsync(lobbyId, player);

            var newPlayerAction = new GameAction<NewPlayerPayload>
            {
                Type = GameActionType.NewPlayer,
                Payload = new NewPlayerPayload
                {
                    Player = createdPlayer
                },
                LobbyId = lobbyId,
                PlayerId = createdPlayer.Id
            };

            var handledNewPlayerAction = await _gameHubService.ProcessGameActionAsync(null, newPlayerAction);

            return Ok(handledNewPlayerAction);
        }

        [HttpPost("{lobbyId}/player/{playerId}/leave")]
        public async Task<IActionResult> LeaveLobby(string lobbyId, string playerId)
        {
            await _lobbyService.LeaveLobbyAsync(lobbyId, playerId);

            await _gameHubService.ProcessGameActionAsync(
                null,
                new GameAction<LeavePlayerPayload>
                {
                    Type = GameActionType.LeavePlayer,
                    Payload = new LeavePlayerPayload
                    {
                        PlayerId = playerId
                    },
                    LobbyId = lobbyId,
                    PlayerId = playerId
                }
            );

            return Ok();
        }

        [HttpPost("{lobbyId}/startGame")]
        public async Task<IActionResult> StartGame(string lobbyId)
        {
            // TODO: Handle game start
            // await _lobbyService.StartGameAsync(lobbyId, playerId);

            await _gameHubService.ProcessGameActionAsync(
                null,
                new GameAction<object>
                {
                    Type = GameActionType.StartGame,
                    Payload = new
                    {
                        LobbyId = lobbyId
                    },
                    LobbyId = lobbyId
                }
            );

            return Ok();
        }
    }
}
