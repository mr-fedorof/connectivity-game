using System;
using System.Threading.Tasks;
using Connectivity.Domain.Enums;
using Connectivity.Domain.GameActions;
using Connectivity.Domain.GameActions.Attributes;
using Connectivity.Domain.GameActions.Payloads;
using Connectivity.Domain.Models.Cards;

namespace Connectivity.Application.GameActions.Handlers
{
    [GameActionType(GameActionType.TakeCardPlayer)]
    public class TakeCardActionHandler : GameActionHandler<TakeCardPayload>
    {
        protected override async Task<GameAction<TakeCardPayload>> HandleAsync(GameAction<TakeCardPayload> gameAction)
        {
            gameAction.Payload.GameCard = new Card
            {
                Id = "card-id",
                Type = CardType.Crocodile,
                Task = new CardTask
                {
                    Id = "task-id",
                    Type = TaskType.Crocodile,
                    BannedWords = new []
                    {
                        "ban 1",
                        "ban 2",
                        "ban 3"
                    },
                    Questions = new []
                    {
                        "Question 1",
                        "Question 2",
                        "Question 3"
                    }
                },
                Timespan = 30,
                Reward = 123
            };

            return gameAction;
        }
    }
}
