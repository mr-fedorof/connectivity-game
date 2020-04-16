using System.Threading.Tasks;
using Connectivity.Application.GameActions.Interfaces;
using Connectivity.Domain.GameActions;
using Newtonsoft.Json.Linq;

namespace Connectivity.Application.GameActions.Handlers
{
    public abstract class GameActionHandler<TPayload> : IGameActionHandler
    {
        public async Task<GameActionResponse> HandleAsync(GameAction gameAction)
        {
            var gameActionT = new GameAction<TPayload>(gameAction);

            var gameActionResponseT = await HandleAsync(gameActionT);
            
            var gameActionResponse = new GameActionResponse(
                gameActionResponseT.Type,
                gameActionResponseT.Payload,
                gameActionResponseT.PlayerId);

            return gameActionResponse;
        }

        protected virtual async Task<GameActionResponse<TPayload>> HandleAsync(GameAction<TPayload> gameAction)
        {
            return new GameActionResponse<TPayload>(
                gameAction.Type,
                gameAction.Payload,
                gameAction.PlayerId);
        }
    }
}
