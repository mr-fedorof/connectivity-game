﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Connectivity.Application.GameActions.Attributes;
using Connectivity.Application.GameActions.Interfaces;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Connectivity.Application.GameActions
{
    public class GameActionDispatcher : IGameActionDispatcher
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly Dictionary<GameActionType, Type> _gameActionHandlerTypes;

        public GameActionDispatcher(
            IServiceCollection serviceCollection,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _gameActionHandlerTypes = serviceCollection
                .Where(t => typeof(IGameActionHandler).IsAssignableFrom(t.ServiceType))
                .Select(t => t.ImplementationType)
                .ToDictionary(t => t.GetCustomAttribute<GameActionTypeAttribute>().Type, t => t);
        }

        public async Task<GameActionResponse> DispatchAsync(GameAction gameAction)
        {
            var getGameActionHandler = GetGameActionHandler(gameAction.Type);

            var response = getGameActionHandler != null
                ? await getGameActionHandler.HandleAsync(gameAction)
                : new GameActionResponse(gameAction);

            return response;
        }

        private IGameActionHandler GetGameActionHandler(GameActionType type)
        {
            if (!_gameActionHandlerTypes.ContainsKey(type))
            {
                return null;
            }

            return (IGameActionHandler)_httpContextAccessor
                .HttpContext
                .RequestServices
                .GetService(_gameActionHandlerTypes[type]);
        }
    }
}