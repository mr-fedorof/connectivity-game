using System;
using System.IO;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ImportExcelCardsBatch
{
    class Program
    {
        private static IServiceProvider _container;
        static async Task Main(string[] args)
        {
            var env = args[0];
            var fileName = args[1];
            var mode = args[2];
            var clearOnImport = args[3] ?? "y";


            Console.WriteLine($"Configuring the app");
            var serviceCollection = new ServiceCollection();
            serviceCollection.ConfigureServices(env);

            _container = serviceCollection.BuildServiceProvider();
            var service = _container.GetService<IGameCardService>();
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), fileName);

            switch (mode)
            {
                case "import":
                    Console.WriteLine($"Importing {fileName} to env {env}");
 

                    Console.WriteLine($"Reading cards from {filePath}");
                    var cards = ExcelHelper.ReadCards(filePath);

                    if (clearOnImport == "y")
                    {
                        Console.WriteLine($"Deleting old previously saved cards from db");
                        await service.DeleteAllCardsAsync();
                    }

                    Console.WriteLine($"Saving {cards.Count} cards (might take some time)");
                    await service.SaveCardsAsync(cards);

                    Console.WriteLine($"Done. Max Pidor. Saved {cards.Count} cards");
                    break;
                case "export":
                    var cardsSaved = service.GetAllCardsAsync();
                    ExcelHelper.WriteCards(filePath, cardsSaved);
                    break;
                default:
                    throw new Exception("Max, zaebal, tolko import/export");
            }




        }
    }
}
