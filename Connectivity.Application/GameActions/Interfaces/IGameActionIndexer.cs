namespace Connectivity.Application.GameActions.Interfaces
{
    public interface IGameActionIndexer
    {
        int CurrentIndex(string lobbyId);

        int NextIndex(string lobbyId);
    }
}