using Connectivity.Domain.Enums;

namespace Connectivity.Domain.Models.Cards
{
    public class Card
    {
        public string Id { get; set; }

        public CardTask Task { get; set; }

        public CardType Type { get; set; }

        public int Timespan { get; set; }

        public int Reward { get; set; }
    }
}