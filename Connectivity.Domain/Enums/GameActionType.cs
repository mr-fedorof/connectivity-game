using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Connectivity.Domain.GameActions.Attributes;

namespace Connectivity.Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumMemberConverter))]
    public enum GameActionType
    {
        // In lobby
        [EnumMember(Value = "[Player] [Sh] New")]
        NewPlayer,
        [EnumMember(Value = "[Player] [Sh] Leave")]
        LeavePlayer,
        [EnumMember(Value = "[Player] [Sh] Join Team")]
        JoinTeamPlayer,
        [EnumMember(Value = "[Player] [Sh] Leave Team")]
        LeaveTeamPlayer,
        [EnumMember(Value = "[Player] [Sh] Long Action")]
        LongActionPlayer,
        [EnumMember(Value = "[Player] [Sh] Ready")]
        ReadyPlayer,
        [EnumMember(Value = "[Player] [Sh] Not Ready")]
        NotReadyPlayer,

        // In Game
        [EnumMember(Value = "[Player] [Sh] Skip Move")]
        SkipMovePlayer,
        [EnumMember(Value = "[Player] [Sh] Roll Dice")]
        RollDicePlayer,
        [EnumMember(Value = "[Player] [Sh] Take Card")]
        TakeCardPlayer,
        [EnumMember(Value = "[Player] [Sh] Take Another Card")]
        TakeAnotherCardPlayer,
        [EnumMember(Value = "[Player] [Sh] Card Reading Start")]
        CardReadingStartPlayer,
        [EnumMember(Value = "[Player] [Sh] Card Reading Finish")]
        CardReadingFinishPlayer,
        [EnumMember(Value = "[Player] [Sh] Card Task Success")]
        CardTaskSuccessPlayer,
        [EnumMember(Value = "[Player] [Sh] Card Task Fail")]
        CardTaskFailPlayer,

        [SkipIndex]
        [EnumMember(Value = "[Lobby] [Sh] [SI] Share")]
        ShareLobby,
        [SkipIndex]
        [EnumMember(Value = "[Lobby] [Sh] [SI] Share Response")]
        ShareLobbyResponse,
        [SkipIndex]
        [EnumMember(Value = "[Lobby] [Sh] [SI] Share Actions")]
        ShareActionsLobby,
        [SkipIndex]
        [EnumMember(Value = "[Lobby] [Sh] [SI] Share Actions Response")]
        ShareActionsLobbyResponse,

        [EnumMember(Value = "[Game] [Sh] [Sys] Ready To Start")]
        ReadyToStartGame,
        [EnumMember(Value = "[Game] [Sh] [Sys] Not Ready To Start")]
        NotReadyToStartGame,
        [EnumMember(Value = "[Game] [Sh] [Sys] Start")]
        StartGame,
        [EnumMember(Value = "[Game] [Sh] [Sys] Next Player")]
        NextPlayerGame,
        [EnumMember(Value = "[Game] [Sh] [Sys] Card Reading Finish")]
        CardReadingFinishGame,
        [EnumMember(Value = "[Game] [Sh] [Sys] Start Card Task")]
        CardTaskStartGame,
        [EnumMember(Value = "[Game] [Sh] [Sys] Finish Card Task")]
        CardTaskFinishGame
    }
}