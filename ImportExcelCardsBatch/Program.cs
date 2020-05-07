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

            Console.WriteLine($"Importing {fileName} to env {env}");
            Console.WriteLine($"Configuring the app");
            var serviceCollection = new ServiceCollection();
            serviceCollection.ConfigureServices(env);

            _container = serviceCollection.BuildServiceProvider();
            var service = _container.GetService<IGameCardsService>();

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), fileName);

            Console.WriteLine($"Reading cards from {filePath}");
            var cards = ExcelHelper.ReadCardsByType(filePath);

            Console.WriteLine($"Deleting old previously saved cards from db");
            await service.DeleteAllCardsAsync();

            Console.WriteLine($"Saving {cards.Count} cards (might take some time)");
            await service.SaveCardsAsync(cards);
            var cardsSaved = service.GetAllCardsAsync();
            Console.WriteLine($"Done. Max Pidor. Saved {cardsSaved.Count} cards");

            //foreach (var card in cardsSaved)
            //{
            //    Console.WriteLine($"{card.Type} - {card.Task.Type}");
            //    foreach (var task in card.Task.Questions)
            //    {
            //        Console.WriteLine($"\t{task}");
            //    }

            //    if (card.Task.BannedWords?.Length > 0)
            //    {
            //        Console.WriteLine($"\t====");

            //        foreach (var task in card.Task.BannedWords)
            //        {
            //            Console.WriteLine($"\t{task}");
            //        }
            //    }

            //    Console.WriteLine($"========");
            //}
        }
    }
}
