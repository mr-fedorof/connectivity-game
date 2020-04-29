using System.Threading.Tasks;
using Connectivity.Application.GameActions.Interfaces;
using Connectivity.Domain.GameActions;

namespace Connectivity.Application.GameActions.Handlers
{
    public abstract class GameActionHandler<TPayload> : IGameActionHandler
        where TPayload : class
    {
        public async Task<GameAction> HandleAsync(GameAction inGameAction)
        {
            var inGameActionT = new GameAction<TPayload>(inGameAction);

            var outGameActionT = await HandleAsync(inGameActionT);
            
            var outGameAction = new GameAction(outGameActionT);

            return outGameAction;
        }

        protected abstract Task<GameAction<TPayload>> HandleAsync(GameAction<TPayload> gameAction);
    }
}
