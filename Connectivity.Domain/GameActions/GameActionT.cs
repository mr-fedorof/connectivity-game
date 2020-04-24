using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions
{
    public class GameAction<TPayload>
    {
        public GameAction()
        {
        }

        public GameAction(GameActionType type, TPayload payload, string lobbyId, string playerId, bool @long)
        {
            Type = type;
            Payload = payload;
            LobbyId = lobbyId;
            PlayerId = playerId;
            Long = @long;
        }

        public GameActionType Type { get; set; }

        public TPayload Payload { get; set; }

        public string LobbyId { get; set; }

        public string PlayerId { get; set; }

        public bool Long { get; set; }

        public int? Index { get; set; }
    }
}