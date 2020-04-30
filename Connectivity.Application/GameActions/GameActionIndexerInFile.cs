using System.IO;
using Connectivity.Application.GameActions.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace Connectivity.Application.GameActions
{
    public class GameActionIndexerInFile : IGameActionIndexer
    {
        private readonly object _syncObject = new object();

        private readonly IMemoryCache _cache;

        public GameActionIndexerInFile(IMemoryCache cache)
        {
            _cache = cache;

            Directory.CreateDirectory("game-action-index-cache");
        }

        public int CurrentIndex(string lobbyId)
        {
            lock (_syncObject)
            {
                var currentIndex = _cache.Get<int?>(lobbyId) ?? 0;
                if (currentIndex == 0 && File.Exists($@"game-action-index-cache\{lobbyId}"))
                {
                    currentIndex = int.Parse(File.ReadAllText($@"game-action-index-cache\{lobbyId}"));
                }

                return currentIndex;
            }
        }

        public int NextIndex(string lobbyId)
        {
            lock (_syncObject)
            {
                var currentIndex = _cache.Get<int?>(lobbyId) ?? 0;
                if (currentIndex == 0 && File.Exists($@"game-action-index-cache\{lobbyId}"))
                {
                    currentIndex = int.Parse(File.ReadAllText($@"game-action-index-cache\{lobbyId}"));
                }

                currentIndex += 1;

                _cache.Set(lobbyId, currentIndex);
                File.WriteAllText($@"game-action-index-cache\{lobbyId}", currentIndex.ToString());

                return currentIndex;
            }
        }
    }

}
