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

        public async Task<GameActionResponse> HandleAsync(GameAction gameAction)
        {
            var gameActionT = new GameAction<TPayload>(
                gameAction.Type,
                JsonSerializer.Deserialize<TPayload>(gameAction.Payload.RootElement.ToString(), _jsonOptions),
                gameAction.LobbyId,
                gameAction.PlayerId);

            var gameActionResponseT = await HandleAsync(gameActionT);
            
            var gameActionResponse = new GameActionResponse(
                gameActionResponseT.Type,
                JsonDocument.Parse(JsonSerializer.SerializeToUtf8Bytes(gameActionResponseT.Payload, _jsonOptions)),
                gameActionResponseT.LobbyId,
                gameActionResponseT.PlayerId);

            return gameActionResponse;
        }

        protected abstract Task<GameActionResponse<TPayload>> HandleAsync(GameAction<TPayload> gameAction);
    }
}
