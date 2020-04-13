using Connectivity.Persistence.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Connectivity.Persistence
{
    public static class ServicesConfiguration
    {
        public static void AddCosmosDB(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ConnectivityDbContext>(builder =>
            {
                var config = configuration.GetSection(nameof(CosmosDbConfiguration)).Get<CosmosDbConfiguration>();
                builder.UseCosmos(config.AccountEndpoint, config.AccountKey, config.DatabaseName);
            });
        }
    }
}
