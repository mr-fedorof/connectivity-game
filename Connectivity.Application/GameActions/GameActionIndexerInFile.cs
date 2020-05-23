using System;
using System.IO;
using System.Threading.Tasks;
using Connectivity.Application.GameActions.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;

namespace Connectivity.Application.GameActions
{
    public class GameActionIndexerInFile : IGameActionIndexer
    {
        private readonly object _syncObject = new object();
        private readonly string _path;

        private readonly IMemoryCache _cache;

        public GameActionIndexerInFile(IConfiguration configuration, IMemoryCache cache)
        {
            _cache = cache;
            _path = configuration["GameActionIndexerFilePath"];

            Directory.CreateDirectory(_path);
        }

        public Task<int> CurrentIndex(Guid lobbyId)
        {
            lock (_syncObject)
            {
                var currentIndex = _cache.Get<int?>(lobbyId) ?? 0;
                if (currentIndex == 0 && File.Exists($@"{_path}\{lobbyId}"))
                {
                    currentIndex = int.Parse(File.ReadAllText($@"{_path}\{lobbyId}"));
                }

                return Task.FromResult(currentIndex); ;
            }
        }

        public Task<int> NextIndex(Guid lobbyId)
        {
            lock (_syncObject)
            {
                var currentIndex = _cache.Get<int?>(lobbyId) ?? 0;
                if (currentIndex == 0 && File.Exists($@"{_path}\{lobbyId}"))
                {
                    currentIndex = int.Parse(File.ReadAllText($@"{_path}\{lobbyId}"));
                }

                currentIndex += 1;

                _cache.Set(lobbyId, currentIndex);
                File.WriteAllText($@"{_path}\{lobbyId}", currentIndex.ToString());

                return Task.FromResult(currentIndex);
            }
        }
    }

}
