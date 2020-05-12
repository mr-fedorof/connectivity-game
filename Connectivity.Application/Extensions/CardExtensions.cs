using Connectivity.Domain.Enums;
using Connectivity.Domain.Models.Cards;
using System;
using System.Collections.Generic;

namespace Connectivity.Application.Extensions
{
    public static class CardExtensions
    {
        private static Random _rnd = new Random();

        public static T Pop<T>(this List<T> list)
        {
            if (list.Count == 0)
            {
                return default(T);
            }

            T r = list[0];
            list.RemoveAt(0);
            return r;
        }

        public static void Shuffle<T>(this List<T> list)
        {
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = _rnd.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }

        public static string TryGetCardValue(this CardDeck cardDeck, CardType cardType)
        {
            cardDeck.TryGetValue(cardType, out var cardIds);
            return cardIds.Pop();
        }
    }
}