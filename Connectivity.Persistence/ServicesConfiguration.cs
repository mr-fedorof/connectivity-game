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
            var config = configuration.GetSection(nameof(CosmosDbConfiguration)).Get<CosmosDbConfiguration>();

            services.AddDbContext<ConnectivityDbContext>(builder =>
            {
                builder.UseCosmos(config.AccountEndpoint, config.AccountKey, config.DatabaseName);
            });

            services.AddDbContext<CardsDbContext>(builder =>
            {
                builder.UseCosmos(config.AccountEndpoint, config.AccountKey, config.DatabaseName);
            });
        }
    }
}
