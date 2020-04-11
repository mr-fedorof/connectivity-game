namespace Connectivity.WebApi.Models
{
    public class Team
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public Player[] Players { get; set; }
    }
}