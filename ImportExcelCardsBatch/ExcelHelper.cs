using System;
using System.Collections.Generic;
using System.IO;
using Connectivity.Domain.Enums;
using Connectivity.Domain.Models.Cards;
using OfficeOpenXml;

namespace ImportExcelCardsBatch
{
    public static class ExcelHelper
    {
        public static List<Card> ReadCardsByType(string filePath)
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
            ImportJoker(package, cards);

            return cards;
        }

        private static void ImportAlias(ExcelPackage package, List<Card> cards)
        {
            var sheet = package.Workbook.Worksheets["Alias"];
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
            var sheet = package.Workbook.Worksheets["Taboo"];
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
            var sheet = package.Workbook.Worksheets["Draw"];

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
            var sheet = package.Workbook.Worksheets["Crocodile"];
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
            var sheet = package.Workbook.Worksheets["Who Am I"];
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

        private static void ImportJoker(ExcelPackage package, List<Card> cards)
        {
            var sheet = package.Workbook.Worksheets["Joker"];
            var curr = 2;
            var found = 0;

            while (true)
            {
                if (sheet == null || string.IsNullOrEmpty(sheet.Cells[$"A{curr}"].Text) || string.IsNullOrEmpty(sheet.Cells[$"B{curr}"].Text))
                {
                    break;
                }

                if (sheet.Cells[$"B{curr}"].Text == "Шиворот-навыворот")
                {
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
                }

                if (sheet.Cells[$"B{curr}"].Text == "Не мое кино")
                {
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
                }

                if (sheet.Cells[$"B{curr}"].Text == "Говорящая книга")
                {
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
                }

                if (sheet.Cells[$"B{curr}"].Text == "Не моя песня")
                {
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
                }
                found++;
            }
            Console.WriteLine($"Found {found} Joker cards");
        }
    }
}