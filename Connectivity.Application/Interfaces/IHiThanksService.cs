using Connectivity.Domain.Models;
using System.Threading.Tasks;
using Connectivity.Domain.Models.Game;

namespace Connectivity.Application.Interfaces
{
    public interface IHiThanksService : IBaseActionService
    {
        Task<object> HiThanksAsync(HiThanksParameters parameters);
    }
}