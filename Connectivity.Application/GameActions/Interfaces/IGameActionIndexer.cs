using System;

namespace Connectivity.Application.GameActions.Interfaces
{
    public interface IGameActionIndexer
    {
        int CurrentIndex(Guid lobbyId);

        int NextIndex(Guid lobbyId);
    }
}