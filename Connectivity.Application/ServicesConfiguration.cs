using System.Linq;
using System.Reflection;
using Connectivity.Application.GameActions;
using Connectivity.Application.GameActions.Interfaces;
using Connectivity.Application.Services;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.GameActions.Attributes;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Connectivity.Application
{
    public static class ServicesConfiguration
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IGameActionIndexer, GameActionIndexerInFile>();
            services.AddSingleton<IGameActionDispatcher, GameActionDispatcher>();
            // TODO: Make singleton
            services.AddScoped<IGameHubService, GameHubService>();
            services.AddGameActionHandlers(typeof(IGameActionHandler).Assembly);

            // TODO: Make singleton
            services.AddScoped<ILobbyService, LobbyService>();
        }

        private static IServiceCollection AddGameActionHandlers(this IServiceCollection services, Assembly assembly)
        {
            var gameActionHandlers = assembly.ExportedTypes
                .Where(x => !x.IsInterface && !x.IsAbstract)
                .Where(x => typeof(IGameActionHandler).IsAssignableFrom(x) && x.GetCustomAttribute<GameActionTypeAttribute>() != null);

            foreach (var gameActionHandler in gameActionHandlers)
            {
                services.AddScoped(gameActionHandler);
            }

            return services;
        }
    }
}
