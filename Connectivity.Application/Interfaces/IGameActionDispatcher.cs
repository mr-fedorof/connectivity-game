using Connectivity.Domain.Enums;
using System.Threading.Tasks;
using Connectivity.Domain.Models;

namespace Connectivity.Application.Interfaces
{
    public interface IGameActionDispatcher
    {
        Task<GameActionResponse> Invoke(GameAction request);
    }
}