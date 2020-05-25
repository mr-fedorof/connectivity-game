using System;

namespace Connectivity.Domain.GameActions.Payloads
{
    public class DrawAction
    {
        public int FromX { get; set; }

        public int FromY { get; set; }

        public int ToX { get; set; }

        public int ToY { get; set; }

        public int StrokeStyle { get; set; }

        public int LineWidth { get; set; }

        public bool Erase { get; set; }
    }
}
