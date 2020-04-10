using Microsoft.AspNetCore.Mvc;

namespace Connectivity.WebApi.Controllers
{
    [ApiController]
    [Route("api/health")]
    public class HealthController : ControllerBase
    {
        [HttpGet("")]
        public IActionResult GetHealth()
        {
            var version = GetType().Assembly.GetName().Version.ToString(3);

            return Ok(new
            {
                Version = version
            });
        }
    }
}
