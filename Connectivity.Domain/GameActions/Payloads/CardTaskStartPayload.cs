using Connectivity.Domain.Enums;
using System;

namespace Connectivity.Domain.GameActions.Payloads
{
    public class CardTaskStartPayload
    {
        public DateTime? StartedAt { get; set; }

        public CardType GameCardType { get; set; }
    }
}
