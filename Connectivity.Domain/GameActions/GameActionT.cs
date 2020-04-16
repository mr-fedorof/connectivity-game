using System.Text.Json;
using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions
{
    public class GameAction<TPayload>
    {
        public GameAction()
        {
        }

        public GameAction(GameAction gameAction)
            : this(gameAction.Type, gameAction.Payload, gameAction.PlayerId)
        {
        }

        public GameAction(GameActionType type, object payload, string playerId)
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