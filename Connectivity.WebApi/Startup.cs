using System;
using System.Text.Json;
using Connectivity.Application;
using Connectivity.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Connectivity.Domain.Converters;
using Connectivity.Application.Hubs;
using Connectivity.Domain;
using Connectivity.Domain.Extensions;
using Connectivity.Persistence.DbClients;
using Connectivity.Persistence.Infrastructure;
using Microsoft.Extensions.Options;

namespace Connectivity.WebApi
{
    public class Startup
    {
        public Startup(
            IConfiguration configuration,
            IWebHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }

        public IWebHostEnvironment Environment { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<JsonSerializerOptions>(ConfigureJsonSerializerOptions);

            services.AddSingleton<IServiceCollection>(services);

            services.AddApplicationInsightsTelemetry();
            services.AddDbConfiguration(Configuration);
            services.AddApplicationServices(Configuration, Environment);

            services.AddCors(options =>
            {
                options.AddPolicy(
                    "CorsPolicy",
                    builder => builder
                        .WithOrigins(Configuration.GetSection("AllowedCorsOrigins").Get<string[]>())
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                );
            });

            services.AddControllers()
                .AddJsonOptions(opts =>
                {
                    ConfigureJsonSerializerOptions(opts.JsonSerializerOptions);
                });
            services.AddSignalR()
                .AddJsonProtocol(opts =>
                {
                    ConfigureJsonSerializerOptions(opts.PayloadSerializerOptions);
                });

            services.AddMemoryCache();
        }

        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsLocal())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<GameHub>("hub/game");
            });

            InitializeAppDefaults(app.ApplicationServices);
            InitializeConnectivityDbClient(app.ApplicationServices);
        }

        private void ConfigureJsonSerializerOptions(JsonSerializerOptions options)
        {
            options.PropertyNameCaseInsensitive = true;
            options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.Converters.Add(new JsonConverterJsonDocument());
        }

        private void InitializeAppDefaults(IServiceProvider serviceProvider)
        {
            AppDefaults.JsonOptions = serviceProvider.GetRequiredService<IOptions<JsonSerializerOptions>>().Value;
        }

        private void InitializeConnectivityDbClient(IServiceProvider serviceProvider)
        {
            var serviceScopeFactory = serviceProvider.GetRequiredService<IServiceScopeFactory>();

            using var serviceScope = serviceScopeFactory.CreateScope();

            var dbClient = serviceScope.ServiceProvider.GetService<IConnectivityDbClient>();

            dbClient.InitializeAsync().Wait();
        }
    }
}
