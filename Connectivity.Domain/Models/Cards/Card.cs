using System;
using Connectivity.Domain.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Connectivity.Domain.Models.Cards
{
    public class Card
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }

        public CardType Type { get; set; }

        public CardTask Task { get; set; }

        public int Timespan { get; set; }

        public int Reward { get; set; }
    }
}