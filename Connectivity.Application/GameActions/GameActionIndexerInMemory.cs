using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Connectivity.Application.GameActions.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace Connectivity.Application.GameActions
{
    public class GameActionIndexerInMemory : IGameActionIndexer
    {
        private readonly IGameCache _cache;

        public GameActionIndexerInMemory(IGameCache cache)
        {
            _cache = cache;
        }

        public async Task<int> CurrentIndex(Guid lobbyId)
        {
            var currentIndex = await _cache.GetAsync<int?>(lobbyId.ToString()) ?? 0;

            return currentIndex;
        }

        public async Task<int> NextIndex(Guid lobbyId)
        {
            // TODO: if applicable, reuse GetOrSetAsync()
            var currentIndex = await _cache.GetAsync<int?>(lobbyId.ToString()) ?? 0;

            currentIndex += 1;

            // TODO: Shurik F - check expiration TimeSpan.FromHours(1)
            await _cache.SetAsync(lobbyId.ToString(), currentIndex, TimeSpan.FromHours(1));

            return currentIndex;
        }
    }
}
