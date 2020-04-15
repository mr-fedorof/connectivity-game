using System;
using System.Linq;
using System.Threading.Tasks;
using Connectivity.Application.Interfaces;
using Connectivity.Application.Services;
using Connectivity.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Connectivity.WebApi.Controllers
{
    [ApiController]
    [Route("api/lobby")]
    public class LobbyController : ControllerBase
    {
        private readonly ILobbyService _lobbyService;

        public LobbyController(ILobbyService lobbyService)
        {
            _lobbyService = lobbyService;
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

            return Ok(createdPlayer);
        }
    }
}
