using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models.Cards;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Connectivity.Domain.Models
{
    public class Lobby
    {
        public Lobby()
        {
            Teams = new List<Team>();
            Players = new List<Player>();
        }

        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        
        public int LastActionIndex { get; set; }

        public string Name { get; set; }

        public Game Game { get; set; }

        public List<Team> Teams { get; set; }

        public List<Player> Players { get; set; }
    }
}