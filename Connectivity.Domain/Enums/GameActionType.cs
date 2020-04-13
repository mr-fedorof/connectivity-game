using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Connectivity.Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumMemberConverter))]
    public enum GameActionType
    {
        HiThanks = 0,

        [EnumMember(Value = "[Player] [S] Take Card")]
        TakeCard = 1,

        Unknown
    }
}