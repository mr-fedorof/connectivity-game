﻿using System.Text.Json;
using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions
{
    public class GameAction : IGameAction
    {
        public GameAction()
        {
        }

        public GameAction(IGameAction gameAction)
        {
            Type = gameAction.Type;
            Payload = JsonDocument.Parse(JsonSerializer.SerializeToUtf8Bytes(gameAction.Payload, AppDefaults.JsonOptions));
            LobbyId = gameAction.LobbyId;
            PlayerId = gameAction.PlayerId;
            Long = gameAction.Long;
            Index = gameAction.Index;
        }

        public GameActionType Type { get; set; }

        public JsonDocument Payload { get; set; }

        object IGameAction.Payload
        {
            get => this.Payload;
            set => this.Payload = value as JsonDocument;
        }

        public string LobbyId { get; set; }

        public string PlayerId { get; set; }

        public bool Long { get; set; }

        public int? Index { get; set; }
    }
}