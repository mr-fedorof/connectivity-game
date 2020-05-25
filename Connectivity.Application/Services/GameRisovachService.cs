using System;
using System.Threading.Tasks;
using Connectivity.Application.Services.Interfaces;
using Connectivity.Domain.GameActions.Payloads;
using Connectivity.Application.GameActions.Interfaces;
using System.Collections.Generic;

namespace Connectivity.Application.Services
{
    public class GameRisovachService : IGameRisovachService
    {
        private readonly TimeSpan _expirationTime = TimeSpan.FromMinutes(3);

        private readonly IGameCache _gameCache;

        public GameRisovachService(IGameCache gameCache)
        {
            _gameCache = gameCache;
        }

        public async Task AddDrawActionAsync(Guid lobbyId, DrawAction drawAction)
        {
            if (drawAction.Erase)
            {
                await DeleteDrawActionsAsync(lobbyId);

                return;
            }

            var risovachKey = GetRisovachKey(lobbyId);

            var drawActions = await _gameCache.GetOrSetAsync(risovachKey, () => new List<DrawAction>(), _expirationTime);

            drawActions.Add(drawAction);

            await _gameCache.SetAsync(risovachKey, drawActions, _expirationTime);
        }

        public async Task<List<DrawAction>> RestoreDrawActionsAsync(Guid lobbyId)
        {
            var risovachKey = GetRisovachKey(lobbyId);

            var drawActions = await _gameCache.GetAsync<List<DrawAction>>(risovachKey) ?? new List<DrawAction>();

            return drawActions;
        }

        public async Task DeleteDrawActionsAsync(Guid lobbyId)
        {
            var risovachKey = GetRisovachKey(lobbyId);

            await _gameCache.DeleteKeyAsync(risovachKey);
        }

        private static string GetRisovachKey(Guid lobbyId) => $"risovach-{lobbyId}";
    }
}