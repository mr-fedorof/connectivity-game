using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models.Cards;
using OfficeOpenXml;

namespace Connectivity.CardsUpdater.Infrastructure
{
    public static class GameCardExcelHelper
    {
        public static List<Card> ReadCards(string filePath)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            var cards = new List<Card>();
            Console.WriteLine($"Opening excel");
            using var package = new ExcelPackage(new FileInfo(filePath));

            ImportAlias(package, cards);
            ImportTaboo(package, cards);
            ImportDraw(package, cards);
            ImportCrocodile(package, cards);
            ImportWhoAmI(package, cards);
            ImportJoker(package, cards, TaskType.JokerTopsyTurvy);
            ImportJoker(package, cards, TaskType.JokerNotMyFilm);
            ImportJoker(package, cards, TaskType.JokerSpeakingBook);
            ImportJoker(package, cards, TaskType.JokerNotMySong);

            return cards;
        }

        private static void ImportAlias(ExcelPackage package, List<Card> cards)
        {
            var sheet = package.Workbook.Worksheets[CardType.Alias.ToString()];
            var curr = 2;
            var found = 0;
            while (true)
            {
                if (sheet == null || string.IsNullOrEmpty(sheet.Cells[$"A{curr}"].Text) || string.IsNullOrEmpty(sheet.Cells[$"A{curr + 1}"].Text))
                {
                    break;
                }
                var card = new Card
                {
                    Type = CardType.Alias,
                    Timespan = 1,
                    Reward = 1,
                    Task = new CardTask
                    {
                        Type = TaskType.Alias,
                        Questions = new[]
                        {
                            sheet.Cells[$"A{curr}"].Text.Trim(),
                            sheet.Cells[$"A{curr + 1}"].Text.Trim()
                        }
                    }
                };
                cards.Add(card);
                curr += 2;
                found++;
            }

            Console.WriteLine($"Found {found} Alias cards");
        }

        private static void ImportTaboo(ExcelPackage package, List<Card> cards)
        {
            var sheet = package.Workbook.Worksheets[CardType.Taboo.ToString()];
            var curr = 2;
            var found = 0;
            while (true)
            {
                if (sheet == null ||
                    string.IsNullOrEmpty(sheet.Cells[$"A{curr}"].Text) ||
                    string.IsNullOrEmpty(sheet.Cells[$"B{curr}"].Text) ||
                    string.IsNullOrEmpty(sheet.Cells[$"B{curr + 1}"].Text) ||
                    string.IsNullOrEmpty(sheet.Cells[$"B{curr + 2}"].Text) ||
                    string.IsNullOrEmpty(sheet.Cells[$"B{curr + 3}"].Text) ||
                    string.IsNullOrEmpty(sheet.Cells[$"B{curr + 4}"].Text))
                {
                    break;
                }

                var card = new Card
                {
                    Type = CardType.Taboo,
                    Timespan = 2,
                    Reward = 2,
                    Task = new CardTask
                    {
                        Type = TaskType.Taboo,
                        Questions = new[]
                        {
                            sheet.Cells[$"A{curr}"].Text.Trim()
                        },
                        BannedWords = new[]
                        {
                            sheet.Cells[$"B{curr}"].Text.Trim(),
                            sheet.Cells[$"B{curr+1}"].Text.Trim(),
                            sheet.Cells[$"B{curr+2}"].Text.Trim(),
                            sheet.Cells[$"B{curr+3}"].Text.Trim(),
                            sheet.Cells[$"B{curr+4}"].Text.Trim(),
                        }
                    }
                };
                cards.Add(card);
                curr += 5;
                found++;
            }

            Console.WriteLine($"Found {found} Taboo cards");
        }

        private static void ImportDraw(ExcelPackage package, List<Card> cards)
        {
            var sheet = package.Workbook.Worksheets[CardType.Draw.ToString()];

            var curr = 2;
            var found = 0;

            while (true)
            {
                if (sheet == null || string.IsNullOrEmpty(sheet.Cells[$"A{curr}"].Text))
                {
                    break;
                }

                var card = new Card
                {
                    Type = CardType.Draw,
                    Timespan = 3,
                    Reward = 3,
                    Task = new CardTask
                    {
                        Type = TaskType.Draw,
                        Questions = new[]
                        {
                            sheet.Cells[$"A{curr}"].Text.Trim()
                        }
                    }
                };
                cards.Add(card);
                curr += 1;
                found++;
            }

            Console.WriteLine($"Found {found} Draw cards");
        }

        private static void ImportCrocodile(ExcelPackage package, List<Card> cards)
        {
            var sheet = package.Workbook.Worksheets[CardType.Crocodile.ToString()];
            var curr = 2;
            var found = 0;

            while (true)
            {
                if (sheet == null || string.IsNullOrEmpty(sheet.Cells[$"A{curr}"].Text))
                {
                    break;
                }
                var card = new Card
                {
                    Type = CardType.Crocodile,
                    Timespan = 2,
                    Reward = 4,
                    Task = new CardTask
                    {
                        Type = TaskType.Crocodile,
                        Questions = new[]
                        {
                            sheet.Cells[$"A{curr}"].Text.Trim()
                        }
                    }
                };
                cards.Add(card);
                curr += 1;
                found++;
            }

            Console.WriteLine($"Found {found} Crocodile cards");
        }

        private static void ImportWhoAmI(ExcelPackage package, List<Card> cards)
        {
            var sheet = package.Workbook.Worksheets[CardType.WhoAmI.ToString()];
            var curr = 2;
            var found = 0;

            while (true)
            {
                if (sheet == null || string.IsNullOrEmpty(sheet.Cells[$"A{curr}"].Text))
                {
                    break;
                }
                var card = new Card
                {
                    Type = CardType.WhoAmI,
                    Timespan = 2,
                    Reward = 5,
                    Task = new CardTask
                    {
                        Type = TaskType.WhoAmI,
                        Questions = new[]
                        {
                            sheet.Cells[$"A{curr}"].Text.Trim()
                        }
                    }
                };
                cards.Add(card);
                curr += 1;
                found++;
            }

            Console.WriteLine($"Found {found} Who Am I cards");
        }

        private static void ImportJoker(ExcelPackage package, List<Card> cards, TaskType type)
        {
            var sheet = package.Workbook.Worksheets[type.ToString()];
            var curr = 2;
            var found = 0;

            switch (type)
            {
                case TaskType.JokerTopsyTurvy:
                    while (true)
                    {
                        if (sheet == null || string.IsNullOrEmpty(sheet.Cells[$"A{curr}"].Text) || string.IsNullOrEmpty(sheet.Cells[$"A{curr + 1}"].Text))
                        {
                            break;
                        }
                        var card = new Card
                        {
                            Type = CardType.Joker,
                            Timespan = 1,
                            Reward = 3,
                            Task = new CardTask
                            {
                                Type = TaskType.JokerTopsyTurvy,
                                Questions = new[]
                                {
                                    sheet.Cells[$"A{curr}"].Text.Trim(),
                                    sheet.Cells[$"A{curr+1}"].Text.Trim()
                                }
                            }
                        };

                        cards.Add(card);
                        curr += 2;
                        found++;
                    }

                    break;
                
                case TaskType.JokerNotMyFilm:
                    while (true)
                    {
                        if (sheet == null || string.IsNullOrEmpty(sheet.Cells[$"A{curr}"].Text) || string.IsNullOrEmpty(sheet.Cells[$"A{curr + 1}"].Text))
                        {
                            break;
                        }
                        var card = new Card
                        {
                            Type = CardType.Joker,
                            Timespan = 1,
                            Reward = 3,
                            Task = new CardTask
                            {
                                Type = TaskType.JokerNotMyFilm,
                                Questions = new[]
                                {
                                    sheet.Cells[$"A{curr}"].Text.Trim(),
                                    sheet.Cells[$"A{curr+1}"].Text.Trim()
                                }
                            }
                        };
                        cards.Add(card);
                        curr += 2;
                        found++;
                    }

                    break;

                case TaskType.JokerSpeakingBook:
                    while (true)
                    {
                        if (sheet == null 
                            || string.IsNullOrEmpty(sheet.Cells[$"A{curr}"].Text) 
                            || string.IsNullOrEmpty(sheet.Cells[$"A{curr + 1}"].Text)
                            || string.IsNullOrEmpty(sheet.Cells[$"A{curr + 2}"].Text))
                        {
                            break;
                        }

                        var card = new Card
                        {
                            Type = CardType.Joker,
                            Timespan = 1,
                            Reward = 3,
                            Task = new CardTask
                            {
                                Type = TaskType.JokerSpeakingBook,
                                Questions = new[]
                                {
                                    sheet.Cells[$"A{curr}"].Text.Trim(),
                                    sheet.Cells[$"A{curr+1}"].Text.Trim(),
                                    sheet.Cells[$"A{curr+2}"].Text.Trim()
                                }
                            }
                        };
                        cards.Add(card);

                        curr += 3;
                        found++;
                    }

                    break;

                case TaskType.JokerNotMySong:
                    while (true)
                    {
                        if (sheet == null 
                            || string.IsNullOrEmpty(sheet.Cells[$"A{curr}"].Text) 
                            || string.IsNullOrEmpty(sheet.Cells[$"A{curr + 1}"].Text))
                        {
                            break;
                        }

                        var card = new Card
                        {
                            Type = CardType.Joker,
                            Timespan = 1,
                            Reward = 3,
                            Task = new CardTask
                            {
                                Type = TaskType.JokerNotMySong,
                                Questions = new[]
                                {
                                    sheet.Cells[$"A{curr}"].Text.Trim(),
                                    sheet.Cells[$"A{curr+1}"].Text.Trim()
                                }
                            }
                        };
                        cards.Add(card);

                        curr += 2;
                        found++;
                    }

                    break;
            }

            Console.WriteLine($"Found {found} {type} cards");
        }

        public static void WriteCards(string filePath, List<Card> cardsSaved)
        {
            var newFile = new FileInfo(filePath);
            if (newFile.Exists)
            {
                Console.WriteLine($"File {filePath} already existed, deleting... ");
                newFile.Delete();  // ensures we create a new workbook

                newFile = new FileInfo(filePath);
                Console.WriteLine($"New file created");
            }

            using var package = new ExcelPackage(newFile);

            Export(package, cardsSaved, CardType.Alias);
            ExportTaboo(package, cardsSaved);
            Export(package, cardsSaved, CardType.Draw);
            Export(package, cardsSaved, CardType.Crocodile);
            Export(package, cardsSaved, CardType.WhoAmI);
            ExportJoker(package, cardsSaved, TaskType.JokerTopsyTurvy);
            ExportJoker(package, cardsSaved, TaskType.JokerNotMyFilm);
            ExportJoker(package, cardsSaved, TaskType.JokerSpeakingBook);
            ExportJoker(package, cardsSaved, TaskType.JokerNotMySong);

            Console.WriteLine($"Done");
            package.Save();
        }

        private static void Export(ExcelPackage package, List<Card> cards, CardType type)
        {
            var worksheet = package.Workbook.Worksheets.Add(type.ToString());
            worksheet.Cells[1, 1].Value = "Question";

            var questions = cards.Where(_ => _.Type == type).SelectMany(card => card.Task.Questions).ToList();
            var idx = 2;
            foreach (var q in questions)
            {
                worksheet.Cells[$"A{idx}"].Value = q;
                idx++;
            }
            worksheet.Cells[$"A1:A{idx}"].AutoFitColumns(0);
            Console.WriteLine($"Exported {idx-2} {type} questions");
        }

        private static void ExportTaboo(ExcelPackage package, List<Card> cards)
        {
            var worksheet = package.Workbook.Worksheets.Add(CardType.Taboo.ToString());
            worksheet.Cells[1, 1].Value = "Question";
            worksheet.Cells[1, 2].Value = "Banned Words";

            var cardsTaboo = cards.Where(_ => _.Type == CardType.Taboo).ToList();
            var idx = 2;
            foreach (var card in cardsTaboo)
            {
                worksheet.Cells[$"A{idx}"].Value = card.Task.Questions.First();

                foreach (var bw in card.Task.BannedWords)
                {
                    worksheet.Cells[$"B{idx}"].Value = bw;
                    idx++;
                }
            }
            worksheet.Cells[$"A1:B{idx}"].AutoFitColumns(0);
            Console.WriteLine($"Exported {idx-2} {CardType.Taboo} questions");
        }

        private static void ExportJoker(ExcelPackage package, List<Card> cards, TaskType taskType)
        {
            var worksheet = package.Workbook.Worksheets.Add($"{taskType}");
            worksheet.Cells[1, 1].Value = "Question";

            var questions = cards.Where(_ => _.Task.Type == taskType).SelectMany(card => card.Task.Questions).ToList();
            var idx = 2;
            foreach (var q in questions)
            {
                worksheet.Cells[$"A{idx}"].Value = q;
                idx++;
            }
            worksheet.Cells[$"A1:A{idx}"].AutoFitColumns(0);
            Console.WriteLine($"Exported {idx - 2} {taskType} questions");
        }
    }
}