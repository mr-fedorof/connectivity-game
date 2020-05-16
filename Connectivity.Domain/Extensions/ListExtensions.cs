using System;
using System.Collections.Generic;

namespace Connectivity.Domain.Extensions
{
    public static class ListExtensions
    {
        private static readonly Random Random = new Random();

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
                int k = Random.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }
    }
}