using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Connectivity.Application.GameActions.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace Connectivity.Application.GameActions
{
    public class GameCacheInMemory : IGameCache
    {
        private readonly IMemoryCache _cache;
        private readonly ConcurrentDictionary<string, SemaphoreSlim> _locks;

        public GameCacheInMemory(IMemoryCache cache)
        {
            _cache = cache;
            _locks = new ConcurrentDictionary<string, SemaphoreSlim>();
        }

        public Task<bool> HasKeyAsync(
            string key,
            CancellationToken cancellationToken = default)
        {
            return Task.FromResult(_cache.TryGetValue(key, out _));
        }

        public async Task SetAsync<TValue>(
            string key,
            TValue value,
            TimeSpan expiry,
            CancellationToken cancellationToken = default)
        {
            var @lock = _locks.GetOrAdd(key, x => new SemaphoreSlim(1, 1));
            await @lock.WaitAsync(cancellationToken).ConfigureAwait(false);

            try
            {
                _cache.Set(key, value, new MemoryCacheEntryOptions().SetSlidingExpiration(expiry));
            }
            finally
            {
                @lock.Release();
                _locks.TryRemove(key, out _);
            }
        }
        public async Task<TValue> GetAsync<TValue>(
            string key,
            CancellationToken cancellationToken = default)
        {
            var @lock = _locks.GetOrAdd(key, x => new SemaphoreSlim(1, 1));
            await @lock.WaitAsync(cancellationToken).ConfigureAwait(false);

            try
            {
                _cache.TryGetValue(key, out TValue entry);
                return entry;
            }
            finally
            {
                @lock.Release();
                _locks.TryRemove(key, out _);
            }
        }

        public async Task<TValue> GetOrSetAsync<TValue>(
            string key,
            Func<TValue> valueFactory,
            TimeSpan expiry,
            CancellationToken cancellationToken = default)
        {
            var @lock = _locks.GetOrAdd(key, x => new SemaphoreSlim(1, 1));
            await @lock.WaitAsync(cancellationToken).ConfigureAwait(false);

            try
            {
                return _cache.GetOrCreate(key, entry =>
                {
                    entry.SetSlidingExpiration(expiry).SetSize(1);
                    return valueFactory();
                });
            }
            catch
            {
                return valueFactory();
            }
            finally
            {
                @lock.Release();
                _locks.TryRemove(key, out _);
            }
        }
        public async Task<bool> DeleteKeyAsync(string key, CancellationToken cancellationToken = default)
        {
            var @lock = _locks.GetOrAdd(key, x => new SemaphoreSlim(1, 1));
            await @lock.WaitAsync(cancellationToken).ConfigureAwait(false);

            try
            {
                _cache.Remove(key);

                return true;
            }
            finally
            {
                @lock.Release();
                _locks.TryRemove(key, out _);
            }
        }
    }
}
