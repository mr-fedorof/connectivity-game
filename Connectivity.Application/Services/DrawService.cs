using Connectivity.Application.Interfaces;
using Connectivity.Domain.Models;
using System.Threading.Tasks;
using Connectivity.Domain.Models.Game;

namespace Connectivity.Application.Services
{
    public class DrawService: IDrawService
    {
        public async Task<object> LogDrawActionAsync(DrawParams parameters)
        {
            // TODO: call some log state object here might be called as 

            return parameters;
        }
    }
}