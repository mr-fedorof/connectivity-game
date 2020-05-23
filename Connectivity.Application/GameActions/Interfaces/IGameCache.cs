using System;
using System.Threading;
using System.Threading.Tasks;

namespace Connectivity.Application.GameActions.Interfaces
{
    public interface IGameCache
    {
        Task<bool> HasKeyAsync(
            string key,
            CancellationToken cancellationToken = default);

        Task SetAsync<TValue>(
            string key,
            TValue value,
            TimeSpan expiry,
            CancellationToken cancellationToken = default);

        Task<TValue> GetAsync<TValue>(
            string key,
            CancellationToken cancellationToken = default);

        Task<TValue> GetOrSetAsync<TValue>(
            string key,
            Func<TValue> valueFactory,
            TimeSpan expiry,
            CancellationToken cancellationToken = default);

        Task<bool> DeleteKeyAsync(string key, CancellationToken cancellationToken = default);
    }
}