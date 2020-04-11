namespace Connectivity.WebApi.Models
{
    public class Lobby
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public Team[] Teams { get; set; }

        public Player[] Players { get; set; }
    }
}