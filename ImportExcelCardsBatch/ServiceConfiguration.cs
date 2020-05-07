using System;
using System.Collections.Generic;
using System.IO;
using Connectivity.Application.Services;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Persistence;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ImportExcelCardsBatch
{
    public static class ServiceConfiguration
    {
        private static IConfiguration _configuration;

        public static void ConfigureServices(this IServiceCollection services, string env)
        {
            services.AddConfiguration(env);

            services.AddCosmosDB(_configuration);
            services.AddTransient<IGameCardsService, GameCardsService>();
        }

        private static void AddConfiguration(
            this IServiceCollection services,
            string env)
        {
            _configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{env}.json", true).Build();

            services.AddSingleton(_configuration);
        }
    }
}