using System.Threading.Tasks;
using Connectivity.Domain.GameActions;

namespace Connectivity.Application.GameActions.Interfaces
{
    public interface IGameActionDispatcher
    {
        Task<GameActionResponse> DispatchAsync(GameAction gameAction);
    }
}