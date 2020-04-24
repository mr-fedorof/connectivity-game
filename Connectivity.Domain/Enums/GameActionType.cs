using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Connectivity.Domain.GameActions.Attributes;

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
        [EnumMember(Value = "[Player] [Sh] Join Team")]
        JoinTeamPlayer,
        [EnumMember(Value = "[Player] [Sh] Leave Team")]
        LeaveTeamPlayer,
        [EnumMember(Value = "[Player] [Sh] Long Action")]
        LongActionPlayer,

        [SkipIndex]
        [EnumMember(Value = "[Lobby] [Sh] [SI] Share")]
        ShareLobby,
        [SkipIndex]
        [EnumMember(Value = "[Lobby] [Sh] [SI] Share Response")]
        ShareLobbyResponse,

        [EnumMember(Value = "[TBD] StartGame")]
        StartGame,
    }
}