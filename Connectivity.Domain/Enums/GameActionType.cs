using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Connectivity.Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumMemberConverter))]
    public enum GameActionType
    {
        HiThanks,

        [EnumMember(Value = "[Player] [S] Take Card")]
        TakeCard,

        [EnumMember(Value = "[Player] [S] Draw")]
        Draw,

        Unknown
    }
}