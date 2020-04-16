using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions
{
    public class GameAction<TPayload>
    {
        public GameAction()
        {
        }

        public GameAction(GameActionType type, TPayload payload, string lobbyId, string playerId)
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