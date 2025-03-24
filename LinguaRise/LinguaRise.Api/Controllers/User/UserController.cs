using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LinguaRise.Api.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public partial class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<UserDTO> GetUserAsync(int id)
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserAsync(int id, [FromBody] UserDTO user)
        {
            await _userService.UpdateUserAsync(id, user);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAsync(int id)
        {
            await _userService.DeleteUserAsync(id);

            return Ok();
        }
    }
}
