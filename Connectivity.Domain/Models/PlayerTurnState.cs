using System;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models.Cards;

namespace Connectivity.Domain.Models
{
    public class PlayerTurnState
    {
        public int? DiceValue { get; set; }

        public Card GameCard { get; set; }

        public DateTime? CardReadingStartedAt { get; set; }

        public bool? CardReadingFinished { get; set; }
    }
}