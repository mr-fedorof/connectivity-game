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

        public List<Guid> this[GameCardType type]
        {
            get
            {
                switch (type)
                {
                    case GameCardType.Alias: return Alias;
                    case GameCardType.Taboo: return Taboo;
                    case GameCardType.Draw: return Draw;
                    case GameCardType.Crocodile: return Crocodile;
                    case GameCardType.WhoAmI: return WhoAmI;
                    case GameCardType.Joker: return Joker;
                }

                return null;
            }
            set
            {
                switch (type)
                {
                    case GameCardType.Alias:
                        Alias = value;
                        break;
                    case GameCardType.Taboo:
                        Taboo = value;
                        break;
                    case GameCardType.Draw:
                        Draw = value;
                        break;
                    case GameCardType.Crocodile:
                        Crocodile = value;
                        break;
                    case GameCardType.WhoAmI:
                        WhoAmI = value;
                        break;
                    case GameCardType.Joker:
                        Joker = value;
                        break;
                }
            }
        }

        public Guid? TakeCard(GameCardType gameCardType)
        {
            var list = this[gameCardType];

            if (list == null || list.Count == 0)
            {
                return null;
            }

            return list.Pop();
        }
    }
}