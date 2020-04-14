using Connectivity.Application.Dispatchers;
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
            services.AddScoped<IGameActionDispatcher, GameActionDispatcher>();

            services.AddScoped<ILobbyService, LobbyService>();
            services.AddScoped<IHiThanksService, HiThanksService>();
        }
    }
}
