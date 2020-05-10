using Connectivity.Domain.Models.Cards;

namespace Connectivity.Domain.GameActions.Payloads
{
    public class TakeCardPayload
    {
        public int DiceValue { get; set; }

        public Card GameCard { get; set; }
    }
}
