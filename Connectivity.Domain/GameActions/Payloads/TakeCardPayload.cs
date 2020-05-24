﻿using System;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models.Cards;

namespace Connectivity.Domain.GameActions.Payloads
{
    public class TakeCardPayload
    {
        public GameCardType GameCardType { get; set; }

        public Card GameCard { get; set; }
    }
}
