using System.Text.Json;
using System.Text.Json.Serialization;
using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions
{
    public class GameActionResponse<TPayload>
    {
        public GameActionResponse()
        {
        }

        public GameActionResponse(GameAction<TPayload> gameAction)
            : this(gameAction.Type, gameAction.Payload, gameAction.LobbyId, gameAction.PlayerId)
        {
        }

        public GameActionResponse(GameActionType type, TPayload payload, string lobbyId, string playerId)
        {
            Type = type;
            Payload = payload;
            LobbyId = lobbyId;
            PlayerId = playerId;
        }

        public GameActionType Type { get; set; }

        public TPayload Payload { get; set; }

        public string LobbyId { get; set; }

        public string PlayerId { get; set; }
    }
}