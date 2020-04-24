using System.Linq;
using System.Reflection;
using Connectivity.Application.GameActions;
using Connectivity.Application.GameActions.Interfaces;
using Connectivity.Application.Interfaces;
using Connectivity.Application.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Connectivity.Application
{
    public static class ServicesConfiguration
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IGameActionIndexer, GameActionIndexer>();
            services.AddSingleton<IGameActionDispatcher, GameActionDispatcher>();
            services.AddGameActionHandlers(typeof(IGameActionHandler).Assembly);

            services.AddScoped<ILobbyService, LobbyService>();
        }

        private static IServiceCollection AddGameActionHandlers(this IServiceCollection services, Assembly assembly)
        {
            var gameActionHandlers = assembly.ExportedTypes
                .Where(x => !x.IsInterface && !x.IsAbstract)
                .Where(x => typeof(IGameActionHandler).IsAssignableFrom(x));

            foreach (var gameActionHandler in gameActionHandlers)
            {
                services.AddScoped(gameActionHandler);
            }

            return services;
        }
    }
}
