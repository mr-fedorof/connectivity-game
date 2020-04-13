using System.Collections.Generic;

namespace Connectivity.Domain.Models
{
    public class Lobby
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public IList<Team> Teams { get; set; }

        public IList<Player> Players { get; set; }
    }
}