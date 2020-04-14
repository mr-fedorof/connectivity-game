using Connectivity.Application.Interfaces;
using Connectivity.Domain.Models;
using System.Threading.Tasks;

namespace Connectivity.Application.Services
{
    public class HiThanksService: IHiThanksService
    {
        public async Task<string> HiThanksAsync(HiThanksParameters parameters)
        {
            return $"Hi means {parameters.Hi}. Thanks for {parameters.Thanks}";
        }
    }
}