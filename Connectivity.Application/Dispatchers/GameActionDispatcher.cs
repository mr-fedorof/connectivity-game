using Connectivity.Application.Interfaces;
using System;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Newtonsoft.Json;
using Connectivity.Domain.Models;
using Connectivity.Domain.Models.Game;

namespace Connectivity.Application.Dispatchers
{
    public class GameActionDispatcher : IGameActionDispatcher
    {
        private readonly IHiThanksService _hiThanksService;
        private readonly IDrawService _drawService;

        public GameActionDispatcher(IHiThanksService hiThanksService, IDrawService drawService)
        {
            _hiThanksService = hiThanksService;
            _drawService = drawService;
        }

        public async Task<GameActionResponse> Invoke(GameAction action)
        {
            switch (action.Type)
            {
                case GameActionType.HiThanks:
                    return await ActionProxyAsync<HiThanksParameters>(action, _hiThanksService.HiThanksAsync);                
                case GameActionType.Draw:
                    return await ActionProxyAsync<DrawParams>(action, _drawService.LogDrawActionAsync);
                default:
                    throw new NotSupportedException();
            }
        }

        private async Task<GameActionResponse> ActionProxyAsync<T>(GameAction action, Func<T, Task<object>> func)
        {
            var concreteArgs = JsonConvert.DeserializeObject<T>(action.Payload.ToString());
            var newPayload = await func(concreteArgs);

            return new GameActionResponse
            {
                ActionType = GameActionType.HiThanks,
                Payload = newPayload
            };
        }
    }
}
