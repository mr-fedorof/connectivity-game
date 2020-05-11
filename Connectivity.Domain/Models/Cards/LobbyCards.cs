using System.Collections.Generic;

namespace Connectivity.Domain.Models.Cards
{
    public class LobbyCards
    {
        public List<string> Alias { get; set; }

        public List<string> Taboo { get; set; }

        public List<string> Draw { get; set; }

        public List<string> Crocodile { get; set; }

        public List<string> WhoAmI { get; set; }

        public List<string> Joker { get; set; }
    }
}