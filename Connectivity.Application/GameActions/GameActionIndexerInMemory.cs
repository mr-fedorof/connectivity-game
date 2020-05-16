using System;
using System.Collections.Generic;
using Connectivity.Application.GameActions.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace Connectivity.Application.GameActions
{
    public class GameActionIndexerInMemory : IGameActionIndexer
    {
        private readonly object _syncObject = new object();

        private readonly IMemoryCache _cache;

        public GameActionIndexerInMemory(IMemoryCache cache)
        {
            _cache = cache;
        }

        public int CurrentIndex(Guid lobbyId)
        {
            lock (_syncObject)
            {
                var currentIndex = _cache.Get<int?>(lobbyId) ?? 0;

                return currentIndex;
            }
        }

        public int NextIndex(Guid lobbyId)
        {
            lock (_syncObject)
            {
                var currentIndex = _cache.Get<int?>(lobbyId) ?? 0;

                currentIndex += 1;

                _cache.Set(lobbyId, currentIndex);

                return currentIndex;
            }
        }
    }
}
