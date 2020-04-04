using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Connectivity.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HiThanksController : ControllerBase
    {
        private readonly ILogger<HiThanksController> _logger;

        public HiThanksController(ILogger<HiThanksController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Get()
        {
            return "Hi! Thanks!";
        }
    }
}
