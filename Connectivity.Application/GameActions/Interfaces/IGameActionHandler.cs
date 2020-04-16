using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.Models;

namespace Connectivity.Application.GameActions.Interfaces
{
    public interface IGameActionHandler
    {
        Task<GameActionResponse> HandleAsync(GameAction gameAction);
    }
}
