using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Connectivity.Domain.Models
{
    public class Team
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }

        public string Name { get; set; }
    }
}