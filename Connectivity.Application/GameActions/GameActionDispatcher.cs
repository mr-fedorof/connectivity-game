using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Connectivity.Application.GameActions.Attributes;
using Connectivity.Application.GameActions.Interfaces;
using Connectivity.Application.Hubs;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;

namespace Connectivity.Application.GameActions
{
    public class GameActionDispatcher : IGameActionDispatcher
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHubContext<GameHub> _gameHubContext;
        private readonly Dictionary<GameActionType, Type> _gameActionHandlerTypes;

        public GameActionDispatcher(
            IServiceCollection serviceCollection,
            IHttpContextAccessor httpContextAccessor, 
            IHubContext<GameHub> gameHubContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _gameHubContext = gameHubContext;
            _gameActionHandlerTypes = serviceCollection
                .Where(t => typeof(IGameActionHandler).IsAssignableFrom(t.ServiceType))
                .Select(t => t.ImplementationType)
                .ToDictionary(t => t.GetCustomAttribute<GameActionTypeAttribute>().Type, t => t);
        }

        public async Task<GameActionResponse> DispatchAsync(GameAction gameAction)
        {
            var getGameActionHandler = GetGameActionHandler(gameAction.Type);


            // todo: think about postprocessing stage, return gameAction, then push result to the client
            //var response = getGameActionHandler != null
            //    ? await getGameActionHandler.HandleAsync(gameAction)
            //    : new GameActionResponse(gameAction);

            //return response;

            _ = Task.Run(() =>
            {
                // TODO: deal with shared DB context between tasks
                var result = getGameActionHandler.HandleAsync(gameAction).Result;
                _gameHubContext.Clients.Group(gameAction.LobbyId).SendAsync(GameHubMethod.PostProcessing.ToString(), result);
            });

 
            return new GameActionResponse(gameAction);
        }

        private IGameActionHandler GetGameActionHandler(GameActionType type)
        {
            if (!_gameActionHandlerTypes.ContainsKey(type))
            {
                throw new NotSupportedException();
            }

            return (IGameActionHandler)_httpContextAccessor
                .HttpContext
                .RequestServices
                .GetService(_gameActionHandlerTypes[type]);
        }
    }
}
