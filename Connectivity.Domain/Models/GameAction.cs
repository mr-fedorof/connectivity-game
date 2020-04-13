using Connectivity.Domain.Enums;

namespace Connectivity.Domain.Models
{
    public class GameAction
    {
        public GameActionType Type { get; set; }

        public object Payload { get; set; }

        public string PlayerId { get; set; }
    }
}