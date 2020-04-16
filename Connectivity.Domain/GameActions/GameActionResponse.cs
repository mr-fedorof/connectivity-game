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
            : this(gameAction.Type, gameAction.Payload, gameAction.PlayerId)
        {
        }

        public GameActionResponse(GameActionType type, object payload, string playerId)
        {
            Type = type;
            Payload = payload;
            PlayerId = playerId;
        }

        public GameActionType Type { get; set; }

        public object Payload { get; set; }

        public string PlayerId { get; set; }
    }
}