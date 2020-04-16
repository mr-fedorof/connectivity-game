using Connectivity.Domain.Models;

namespace Connectivity.Domain.GameActions.Payloads
{
    public class JoinTeamPlayerPayload
    {
        public string PlayerId { get; set; }

        public string TeamId { get; set; }
    }
}
