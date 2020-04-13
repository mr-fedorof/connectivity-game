using System.Threading.Tasks;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLobby(string id)
        {
            var lobby = await _lobbyService.GetLobbyAsync(id);
            if (lobby == null)
            {
                return NotFound();
            }

            return Ok(lobby);
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateLobby([FromBody] Lobby lobby)
        {
            var createdLobby = await _lobbyService.CreateLobbyAsync(lobby);

            return Ok(createdLobby);
        }
    }
}
