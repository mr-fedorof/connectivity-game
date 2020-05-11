using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace Connectivity.Persistence.Helpers
{
    public static class PropertyBuilderExtensions
    {
        public static PropertyBuilder<T> HasJsonConversion<T>(this PropertyBuilder<T> builder)
        {
            return builder
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<T>(v));
        }        
        
        [Obsolete("replace with JSON on next card import")]
        public static PropertyBuilder<string[]> HasCsvConversion(this PropertyBuilder<string[]> builder)
        {
            return builder
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));
        }

    }
}