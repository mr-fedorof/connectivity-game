using System;
using System.Linq;

namespace Connectivity.Domain.Helpers
{
    public static class EnumHelper
    {
        public static TEnum[] GetValuesWithAttribute<TEnum, TAttribute>()
            where TEnum : Enum
            where TAttribute : Attribute
        {
            return typeof(TEnum).GetFields()
                .Where(f => Attribute.IsDefined(f, typeof(TAttribute)))
                .Select(f => (TEnum)f.GetRawConstantValue())
                .ToArray();
        }
    }
}