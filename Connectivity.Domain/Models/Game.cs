using Connectivity.Domain.Enums;

namespace Connectivity.Domain.Models
{
    public class Game
    {
        public GameStatus Status { get; set; }

        public string PlayerTurnId { get; set; }

        public PlayerTurnState PlayerTurnState { get; set; }
    }
}