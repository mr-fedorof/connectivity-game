using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions
{
    public class GameAction
    {
        public GameAction()
        {
        }

        public GameAction(GameActionType type, object payload, string playerId)
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