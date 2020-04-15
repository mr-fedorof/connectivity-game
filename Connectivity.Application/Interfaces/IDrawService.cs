using Connectivity.Domain.Models.Game;
using System.Threading.Tasks;

namespace Connectivity.Application.Interfaces
{
   public interface IDrawService: IBaseActionService

    {
        Task<object> LogDrawActionAsync(DrawParams parameters);
    }
}