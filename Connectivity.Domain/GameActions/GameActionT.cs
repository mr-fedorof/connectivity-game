using System;
using System.Text.Json;
using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions
{
    public class GameAction<TPayload> : IGameAction
        where TPayload : class
    {
        public GameAction()
        {
        }

        public GameAction(GameAction gameAction)
        {
            Type = gameAction.Type;
            Payload = JsonSerializer.Deserialize<TPayload>(gameAction.Payload.RootElement.ToString(), AppDefaults.JsonOptions);
            LobbyId = gameAction.LobbyId;
            PlayerId = gameAction.PlayerId;
            Long = gameAction.Long;
            Index = gameAction.Index;
        }

        public GameActionType Type { get; set; }

        public TPayload Payload { get; set; }

        object IGameAction.Payload
        {
            get => this.Payload;
            set => this.Payload = value as TPayload;
        }

        public Guid LobbyId { get; set; }

        public Guid PlayerId { get; set; }

        public bool Long { get; set; }

        public int? Index { get; set; }
    }
}