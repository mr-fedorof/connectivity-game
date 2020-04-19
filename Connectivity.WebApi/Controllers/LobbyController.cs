using System;
using System.Linq;
using System.Threading.Tasks;
using Connectivity.Application.Interfaces;
using Connectivity.Application.Services;
using Connectivity.Application.Hubs;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Payloads;
using Connectivity.Domain.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Connectivity.WebApi.Controllers
{
    [ApiController]
    [Route("api/lobby")]
    public class LobbyController : ControllerBase
    {
        private readonly ILobbyService _lobbyService;
        private readonly IHubContext<GameHub> _gameHubContext;

        public LobbyController(
            ILobbyService lobbyService,
            IHubContext<GameHub> gameHubContext)
        {
            _lobbyService = lobbyService;
            _gameHubContext = gameHubContext;
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

            // TODO: Move to service
            await _gameHubContext.Clients.Group(lobbyId).SendAsync(GameHubMethod.GameAction.ToString(), new GameAction<NewPlayerPayload>
            {
                Type = GameActionType.NewPlayer,
                Payload = new NewPlayerPayload
                {
                    Player = player
                },
                PlayerId = player.Id
            });

            return Ok(createdPlayer);
        }

        [HttpPost("{lobbyId}/player/{playerId}/leave")]
        public async Task<IActionResult> LeaveLobby(string lobbyId, string playerId)
        {
            await _lobbyService.LeaveLobbyAsync(lobbyId, playerId);

            // TODO: Move to service
            await _gameHubContext.Clients.Group(lobbyId).SendAsync(GameHubMethod.GameAction.ToString(), new GameAction<LeavePlayerPayload>
            {
                Type = GameActionType.LeavePlayer,
                Payload = new LeavePlayerPayload
                {
                    PlayerId = playerId
                },
                PlayerId = playerId
            });

            return Ok();
        }

        [HttpPost("{lobbyId}/startGame")]
        public async Task<IActionResult> StartGame(string lobbyId)
        {
            // TODO: Handle game start
            // await _lobbyService.StartGameAsync(lobbyId, playerId);

            // TODO: Move to service
            await _gameHubContext.Clients.Group(lobbyId).SendAsync(GameHubMethod.GameAction.ToString(), new GameAction<object>
            {
                Type = GameActionType.StartGame,
                Payload = new 
                {
                    LobbyId = lobbyId
                }
            });

            return Ok();
        }
    }
}
