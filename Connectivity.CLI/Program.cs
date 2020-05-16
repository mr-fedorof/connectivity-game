using System;
using System.IO;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.CLI.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace Connectivity.CLI
{
    public class Program
    {
        static async Task Main(string[] args)
        {
            if (args.Length != 3 && args.Length != 4)
            {
                Console.WriteLine("Wrong format");

                return;
            }

            var targetEnvironment = args[0];
            var fileName = args[1];
            var operation = args[2].ToLowerInvariant();
            var clearDb = args[3].ToLowerInvariant() ?? "y";

            if (!File.Exists(fileName))
            {
                Console.WriteLine("File does not exist");
                return;
            }

            Console.WriteLine("Initialization...");
            var serviceProvider = BuildServiceProvider(targetEnvironment);
            Console.WriteLine("Initialized");

            var gameCardService = serviceProvider.GetService<IGameCardService>();

            switch (operation)
            {
                case "import":
                    {
                        Console.WriteLine($"Importing {fileName} to env {targetEnvironment}");

                        Console.WriteLine($"Reading cards from {fileName}");
                        var gameCards = GameCardExcelHelper.ReadCards(fileName);

                        if (clearDb == "y")
                        {
                            Console.WriteLine($"Deleting old previously saved cards from db");
                            await gameCardService.DeleteAllCardsAsync();
                        }

                        Console.WriteLine($"Saving {gameCards.Count} cards");
                        await gameCardService.SaveCardsAsync(gameCards);

                        Console.WriteLine($"Saved {gameCards.Count} cards");
                    }
                    break;

                case "export":
                    {
                        Console.WriteLine($"Reading cards from db");
                        var gameCards = await gameCardService.GetAllCardsAsync();

                        Console.WriteLine($"Exporting {gameCards.Count} cards");
                        GameCardExcelHelper.WriteCards(fileName, gameCards);

                        Console.WriteLine($"Exported {gameCards.Count} cards");
                    }
                    break;

                default:
                    throw new Exception("import/export command is required");
            }

            Console.WriteLine("Done");
        }

        private static IServiceProvider BuildServiceProvider(string environment)
        {
            var serviceCollection = new ServiceCollection();
            var configuration = ServiceConfiguration.BuildConfiguration(environment);

            serviceCollection.ConfigureServices(configuration, environment);

            var serviceProvider = serviceCollection.BuildServiceProvider();

            return serviceProvider;
        }
    }
}
