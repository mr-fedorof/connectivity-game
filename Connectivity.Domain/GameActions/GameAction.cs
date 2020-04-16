using System.Text.Json;
using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions
{
    public class GameAction
    {
        public GameActionType Type { get; set; }

        public JsonDocument Payload { get; set; }

        public  string LobbyId { get; set; }

        public string PlayerId { get; set; }
    }
}