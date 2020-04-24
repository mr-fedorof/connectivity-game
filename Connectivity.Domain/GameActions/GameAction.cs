using System.Text.Json;
using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions
{
    public class GameAction
    {
        public GameAction()
        {
        }

        public GameAction(GameActionType type, JsonDocument payload, string lobbyId, string playerId, bool @long)
        {
            Type = type;
            Payload = payload;
            LobbyId = lobbyId;
            PlayerId = playerId;
            Long = @long;
        }

        public GameActionType Type { get; set; }

        public JsonDocument Payload { get; set; }

        public string LobbyId { get; set; }

        public string PlayerId { get; set; }

        public bool Long { get; set; }

        public int? Index { get; set; }
    }
}