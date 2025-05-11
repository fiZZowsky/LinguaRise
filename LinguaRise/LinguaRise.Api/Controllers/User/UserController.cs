using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace LinguaRise.Api.Controllers.User
{
    [Authorize]
    [RequiredScope("API.Access")]
    [Route("api/user")]
    [ApiController]
    public partial class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult GetUserData() 
        {
            var user = HttpContext.User;

            var name = user.FindFirst("name")?.Value
                        ?? user.Identity?.Name
                        ?? "Unknown";
            var email = user.FindFirst("preferred_username")?.Value
                        ?? user.FindFirst("email")?.Value;
            var claims = user.Claims.Select(c => new { c.Type, c.Value });

            return Ok(new
            {
                Name = name,
                Email = email,
                Claims = claims
            });
        }

        [HttpGet("{id}")]
        public async Task<UserDTO> GetUserAsync(Guid id)
        {
            var res = await _userService.GetUserAsync(id);
            return res;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserAsync([FromBody] UserDTO user)
        {
            await _userService.CreateUserAsync(user);

            return Ok();
        }

        [HttpPost("log-in")]
        public async Task<IActionResult> LogInUser()
        {
            var user = HttpContext.User;
            await _userService.LogIn(user);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserAsync(Guid id, [FromBody] UserDTO user)
        {
            await _userService.UpdateUserAsync(id, user);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAsync(Guid id)
        {
            await _userService.DeleteUserAsync(id);

            return Ok();
        }
    }
}
