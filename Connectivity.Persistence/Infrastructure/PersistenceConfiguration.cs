using Connectivity.Persistence.Configuration;
using Connectivity.Persistence.DbClients;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Connectivity.Persistence.Infrastructure
{
    public static class PersistenceConfiguration
    {
        public static IServiceCollection AddDbConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .Configure<MongoDbSettings>(configuration.GetSection(nameof(MongoDbSettings)));

            services
                .AddSingleton<IConnectivityDbClient, ConnectivityDbClient>();

            return services;
        }
    }
}
