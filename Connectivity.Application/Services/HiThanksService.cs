﻿using Connectivity.Application.Interfaces;
using Connectivity.Domain.Models;
using System.Threading.Tasks;
using Connectivity.Domain.Models.Game;

namespace Connectivity.Application.Services
{
    public class HiThanksService: IHiThanksService
    {
        public async Task<object> HiThanksAsync(HiThanksParameters parameters)
        {
            return $"Hi means {parameters.Hi}. Thanks for {parameters.Thanks}";
        }
    }
}