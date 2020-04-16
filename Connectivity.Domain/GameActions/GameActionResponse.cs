using System.Text.Json;
using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions
{
    public class GameActionResponse
    {
        public GameActionResponse()
        {
        }

        public GameActionResponse(GameAction gameAction)
            : this(gameAction.Type, gameAction.Payload, gameAction.LobbyId, gameAction.PlayerId)
        {
        }

        public GameActionResponse(GameActionType type, JsonDocument payload, string lobbyId, string playerId)
        {
            Type = type;
            Payload = payload;
            LobbyId = lobbyId;
            PlayerId = playerId;
        }

        public GameActionType Type { get; set; }

        public JsonDocument Payload { get; set; }

        public string LobbyId { get; set; }

        public string PlayerId { get; set; }
    }
}