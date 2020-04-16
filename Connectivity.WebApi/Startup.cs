using System.Text.Json;
using Connectivity.Application;
using Connectivity.Application.Interfaces;
using Connectivity.Application.Services;
using Connectivity.Persistence;
using Connectivity.WebApi.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Converters;
using System.Text.Json.Serialization;
using Connectivity.Domain.Converters;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Serialization;

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
            services.AddCosmosDB(Configuration);
            services.AddApplicationServices(Configuration);

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
            if (Environment.IsDevelopment())
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
        }

        private void ConfigureJsonSerializerOptions(JsonSerializerOptions options)
        {
            options.PropertyNameCaseInsensitive = true;
            options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.Converters.Add(new JsonConverterJsonDocument());
        }
    }
}
