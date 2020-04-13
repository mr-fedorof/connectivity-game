﻿using Connectivity.Domain.Models;
using System.Threading.Tasks;

namespace Connectivity.Application.Interfaces
{
    public interface IHiThanksService
    {
        Task<string> HiThanksAsync(HiThanksParameters parameters);
    }
}