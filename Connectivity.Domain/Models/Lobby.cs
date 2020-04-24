using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public IList<Team> Teams { get; set; }

        public IList<Player> Players { get; set; }
    }
}