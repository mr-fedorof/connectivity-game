using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Connectivity.Domain.Converters
{
    public sealed class JsonConverterJsonDocument : JsonConverter<JsonDocument>
    {
        public override JsonDocument Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return JsonDocument.ParseValue(ref reader);
        }

        public override void Write(Utf8JsonWriter writer, JsonDocument value, JsonSerializerOptions options)
        {
            value.WriteTo(writer);
        }
    }
}