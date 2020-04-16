using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Connectivity.Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumMemberConverter))]
    public enum GameActionType
    {
        Unknown,

        [EnumMember(Value = "[Player] New")]
        NewPlayer,
        [EnumMember(Value = "[Player] Leave")]
        LeavePlayer,
        [EnumMember(Value = "[Player] [S] Join Team")]
        JoinTeamPlayer,
    }
}