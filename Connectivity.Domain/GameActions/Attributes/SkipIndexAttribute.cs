using System;

namespace Connectivity.Domain.GameActions.Attributes
{
    [AttributeUsage(AttributeTargets.All, AllowMultiple = true)]
    public class SkipIndexAttribute : Attribute
    {
    }
}