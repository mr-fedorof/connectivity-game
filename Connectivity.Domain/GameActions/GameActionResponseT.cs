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

        public GameActionResponse(GameActionType type, TPayload payload, string playerId)
        {
            Type = type;
            Payload = payload;
            PlayerId = playerId;
        }

        public GameActionResponse(GameActionType type, object payload, string playerId)
        {
            Type = type;
            Payload = JsonSerializer.Deserialize<TPayload>(JsonSerializer.Serialize(payload));
            PlayerId = playerId;
        }

        public GameActionType Type { get; set; }

        public TPayload Payload { get; set; }

        public string PlayerId { get; set; }
    }
}