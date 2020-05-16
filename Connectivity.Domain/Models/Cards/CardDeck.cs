using System;
using System.Collections.Generic;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Extensions;

namespace Connectivity.Domain.Models.Cards
{
    public class CardDeck
    {
        public List<Guid> Alias { get; set; } = new List<Guid>();

        public List<Guid> Taboo { get; set; } = new List<Guid>();

        public List<Guid> Draw { get; set; } = new List<Guid>();

        public List<Guid> Crocodile { get; set; } = new List<Guid>();

        public List<Guid> WhoAmI { get; set; } = new List<Guid>();

        public List<Guid> Joker { get; set; } = new List<Guid>();

        public List<Guid> this[CardType type]
        {
            get
            {
                switch (type)
                {
                    case CardType.Alias: return Alias;
                    case CardType.Taboo: return Taboo;
                    case CardType.Draw: return Draw;
                    case CardType.Crocodile: return Crocodile;
                    case CardType.WhoAmI: return WhoAmI;
                    case CardType.Joker: return Joker;
                }

                return null;
            }
            set
            {
                switch (type)
                {
                    case CardType.Alias:
                        Alias = value;
                        break;
                    case CardType.Taboo:
                        Taboo = value;
                        break;
                    case CardType.Draw:
                        Draw = value;
                        break;
                    case CardType.Crocodile:
                        Crocodile = value;
                        break;
                    case CardType.WhoAmI:
                        WhoAmI = value;
                        break;
                    case CardType.Joker:
                        Joker = value;
                        break;
                }
            }
        }

        public Guid? TakeCard(CardType cardType)
        {
            return this[cardType]?.Pop();
        }
    }
}