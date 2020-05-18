using System;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models.Cards;

namespace Connectivity.Domain.GameActions.Payloads
{
    public class TakeAnotherCardPayload
    {
        public CardType GameCardType { get; set; }

        public Card GameCard { get; set; }
    }
}
