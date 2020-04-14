using Connectivity.Application.Interfaces;
using System;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Newtonsoft.Json;
using Connectivity.Domain.Models;

namespace Connectivity.Application.Dispatchers
{
    public class GameActionDispatcher : IGameActionDispatcher
    {
        private readonly IHiThanksService _hiThanksService;

        public GameActionDispatcher(IHiThanksService hiThanksService)
        {
            _hiThanksService = hiThanksService;
        }

        public async Task<GameActionResponse> Invoke(GameAction action)
        {
            switch (action.Type)
            {
                case GameActionType.HiThanks:
                    return await ActionProxyAsync<HiThanksParameters>(action, _hiThanksService.HiThanksAsync);
                default:
                    throw new NotSupportedException();
            }
        }

        public async Task<GameActionResponse> ActionProxyAsync<T>(GameAction action, Func<T, Task<object>> func)
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
