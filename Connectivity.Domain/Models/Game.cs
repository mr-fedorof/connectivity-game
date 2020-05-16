using System.Text.Json.Serialization;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models.Cards;

namespace Connectivity.Domain.Models
{
    public class Game
    {
        public GameStatus Status { get; set; }

        public string PlayerTurnId { get; set; }

        public PlayerTurnState PlayerTurnState { get; set; }

        [JsonIgnore]
        public CardDeck CardDeck { get; set; }
    }
}