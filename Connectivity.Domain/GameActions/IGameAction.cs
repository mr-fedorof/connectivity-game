using System;
using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions
{
    public interface IGameAction
    {
        public GameActionType Type { get; set; }

        public object Payload { get; set; }

        public Guid LobbyId { get; set; }

        public Guid PlayerId { get; set; }

        public bool Long { get; set; }

        public int? Index { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}