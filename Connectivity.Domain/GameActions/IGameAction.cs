using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions
{
    public interface IGameAction
    {
        public GameActionType Type { get; set; }

        public object Payload { get; set; }

        public string LobbyId { get; set; }

        public string PlayerId { get; set; }

        public bool Long { get; set; }

        public int? Index { get; set; }
    }
}