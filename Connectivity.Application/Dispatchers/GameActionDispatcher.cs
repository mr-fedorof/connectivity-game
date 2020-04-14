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
                    var concreteArgs = JsonConvert.DeserializeObject<HiThanksParameters>(action.Payload.ToString());
                    var newPayload = await _hiThanksService.HiThanksAsync(concreteArgs);

                    return new GameActionResponse
                    {
                        ActionType = GameActionType.HiThanks,
                        Payload = newPayload
                    };
                default:
                    throw new NotSupportedException();

            }
        }
    }
}
