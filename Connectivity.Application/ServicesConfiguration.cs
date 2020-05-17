using System.Linq;
using System.Reflection;
using Connectivity.Application.GameActions;
using Connectivity.Application.GameActions.Interfaces;
using Connectivity.Application.Services;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.Extensions;
using Connectivity.Domain.GameActions.Attributes;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Connectivity.Application
{
    public static class ServicesConfiguration
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
        {
            if (environment.IsLocal())
            {
                services.AddSingleton<IGameActionIndexer, GameActionIndexerInFile>();
            }
            else
            {
                services.AddSingleton<IGameActionIndexer, GameActionIndexerInMemory>();
            }

            services.AddSingleton<IGameActionDispatcher, GameActionDispatcher>();
            services.AddScoped<IGameHubService, GameHubService>();
            services.AddGameActionHandlers(typeof(IGameActionHandler).Assembly);

            services.AddSingleton<ILobbyService, LobbyService>();
            services.AddSingleton<IGameService, GameService>();
            services.AddSingleton<IGameCardService, GameCardService>();
            services.AddSingleton<IGameCardDeckService, GameCardDeckService>();
        }

        private static IServiceCollection AddGameActionHandlers(this IServiceCollection services, Assembly assembly)
        {
            var gameActionHandlers = assembly.ExportedTypes
                .Where(x => !x.IsInterface && !x.IsAbstract)
                .Where(x => typeof(IGameActionHandler).IsAssignableFrom(x) && x.GetCustomAttribute<GameActionTypeAttribute>() != null);

            foreach (var gameActionHandler in gameActionHandlers)
            {
                services.AddSingleton(gameActionHandler);
            }

            return services;
        }
    }
}
