using Connectivity.Domain.Enums;

namespace Connectivity.Domain.Models.Cards
{

    public class CardTask
    {
        public string Id { get; set; }

        public TaskType Type { get; set; }

        public string[] Questions { get; set; }

        public string[] BannedWords { get; set; }
    }
}