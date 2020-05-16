using System;
using Connectivity.Domain.Enums;

namespace Connectivity.Domain.Models.Cards
{
    public class Card
    {
        public Guid Id { get; set; }

        public CardType Type { get; set; }

        public CardTask Task { get; set; }

        public int Timespan { get; set; }

        public int Reward { get; set; }
    }
}