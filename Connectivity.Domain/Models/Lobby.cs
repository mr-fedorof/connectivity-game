using System.Collections.Generic;
using System.Text.Json.Serialization;
using Connectivity.Domain.Models.Cards;

namespace Connectivity.Domain.Models
{
    public class Lobby
    {
        public Lobby()
        {
            Teams = new List<Team>();
            Players = new List<Player>();
        }

        public string Id { get; set; }
        
        public int LastActionIndex { get; set; }

        public string Name { get; set; }

        public Game Game { get; set; }

        public IList<Team> Teams { get; set; }

        public IList<Player> Players { get; set; }

        [JsonIgnore]
        public LobbyCards CardIds { get; set; }
    }
}