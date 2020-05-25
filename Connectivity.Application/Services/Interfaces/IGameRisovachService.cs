using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Connectivity.Domain.GameActions.Payloads;

namespace Connectivity.Application.Services.Interfaces
{
    public interface IGameRisovachService
    {
        Task AddDrawActionAsync(Guid lobbyId, DrawAction drawAction);

        Task<List<DrawAction>> RestoreDrawActionsAsync(Guid lobbyId);

        Task DeleteDrawActionsAsync(Guid lobbyId);
    }
}