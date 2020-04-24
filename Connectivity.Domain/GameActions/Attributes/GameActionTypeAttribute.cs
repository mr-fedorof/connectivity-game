using System;
using Connectivity.Domain.Enums;

namespace Connectivity.Domain.GameActions.Attributes
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public class GameActionTypeAttribute : Attribute
    {
        public GameActionType Type { get; }

        public GameActionTypeAttribute(GameActionType type)
        {
            Type = type;
        }
    }
}