using Connectivity.Domain.Enums;

namespace Connectivity.Domain.Models.Cards
{

    public class CardTask
    {
        public TaskType Type { get; set; }

        public string[] Questions { get; set; }

        public string[] BannedWords { get; set; }
    }
}