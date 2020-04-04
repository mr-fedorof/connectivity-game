using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Connectivity.API.Hubs
{
    public class CanvasHub : Hub
    {
        public async Task SendMessage(string res, int x, int y)
        {
            await Clients.All.SendAsync("Drawing", res, x, y);
        }
    }
}
