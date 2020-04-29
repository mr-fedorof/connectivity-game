using System.Threading.Tasks;
using Connectivity.Domain.GameActions;

namespace Connectivity.Application.GameActions.Interfaces
{
    public interface IGameActionHandler
    {
        Task<GameAction> HandleAsync(GameAction inGameAction);
    }
}
