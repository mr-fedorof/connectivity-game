using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Connectivity.Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumMemberConverter))]
    public enum GameHubMethod
    {
        [EnumMember(Value = "GameAction")]
        GameAction,
        [EnumMember(Value = "DrawAction")]
        DrawAction,
        [EnumMember(Value = "RestoreDrawActions")]
        RestoreDrawActions
    }
}
