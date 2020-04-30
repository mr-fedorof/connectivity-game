using Connectivity.Domain.Enums;

namespace Connectivity.Domain.Models
{
    public class Game
    {
        public GameStatus Status { get; set; }

        public string CurrentPlayerId { get; set; }
    }
}