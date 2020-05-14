﻿using System.IO;
using Connectivity.Application.Services;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Persistence;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Connectivity.CardsUpdater.Infrastructure
{
    public static class ServiceConfiguration
    {
        public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration, string environment)
        {
            services.AddSingleton(configuration);

            services.AddCosmosDB(configuration);
            services.AddTransient<IGameCardService, GameCardService>();
        }

        public static IConfiguration BuildConfiguration(string environment)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{environment}.json", true)
                .Build();

            return configuration;
        }
    }
}