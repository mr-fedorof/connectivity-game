using System.Text.Json;
using System.Threading.Tasks;
using Connectivity.Application.GameActions.Interfaces;
using Connectivity.Domain.GameActions;
using Microsoft.Extensions.Options;

namespace Connectivity.Application.GameActions.Handlers
{
    public abstract class GameActionHandler<TPayload> : IGameActionHandler
    {
        private readonly JsonSerializerOptions _jsonOptions;

        protected GameActionHandler(IOptions<JsonSerializerOptions> jsonSerializerOptions)
        {
            _jsonOptions = jsonSerializerOptions.Value;
        }

        public async Task<GameAction> HandleAsync(GameAction inGameAction)
        {
            var inGameActionT = new GameAction<TPayload>(
                inGameAction.Type,
                JsonSerializer.Deserialize<TPayload>(inGameAction.Payload.RootElement.ToString(), _jsonOptions),
                inGameAction.LobbyId,
                inGameAction.PlayerId,
                inGameAction.Long);

            var outGameActionT = await HandleAsync(inGameActionT);
            
            var outGameAction = new GameAction(
                outGameActionT.Type,
                JsonDocument.Parse(JsonSerializer.SerializeToUtf8Bytes(outGameActionT.Payload, _jsonOptions)),
                outGameActionT.LobbyId,
                outGameActionT.PlayerId,
                outGameActionT.Long);

            return outGameAction;
        }

        protected abstract Task<GameAction<TPayload>> HandleAsync(GameAction<TPayload> gameAction);
    }
}
