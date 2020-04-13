using Connectivity.Domain.Enums;

namespace Connectivity.Domain.Models
{
    public class GameActionResponse
    {
        public GameActionType ActionType { get; set; }

        public object Payload { get; set; }
    }
}