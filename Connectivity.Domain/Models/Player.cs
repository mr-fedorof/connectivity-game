using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Connectivity.Domain.Models
{
    public class Player
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string TeamId { get; set; }
    }
}