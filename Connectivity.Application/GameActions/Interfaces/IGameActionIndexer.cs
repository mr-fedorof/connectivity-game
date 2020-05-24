using System;
using System.Threading.Tasks;

namespace Connectivity.Application.GameActions.Interfaces
{
    public interface IGameActionIndexer
    {
        Task<int> CurrentIndex(Guid lobbyId);

        Task<int> NextIndex(Guid lobbyId);
    }
}