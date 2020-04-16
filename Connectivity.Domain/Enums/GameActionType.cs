using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Connectivity.Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumMemberConverter))]
    public enum GameActionType
    {
        [EnumMember(Value = "[Player] New")]
        NewPlayer,

        [EnumMember(Value = "[Player] [S] Take Card")]
        TakeCard,

        Unknown
    }
}