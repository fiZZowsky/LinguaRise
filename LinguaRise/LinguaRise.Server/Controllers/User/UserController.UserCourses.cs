using LinguaRise.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace LinguaRise.Api.Controllers.User
{
    public partial class UserController
    {
        [HttpGet("{id}/courses")]
        public async Task<IEnumerable<CourseDTO>> GetUserCoursesAsync([FromRoute] int id)
        {
            var res = await _userService.GetUserCoursesAsync(id);
            return res;
        }
    }
}
