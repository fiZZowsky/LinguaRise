using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace LinguaRise.Api.Controllers.Course
{
    [Authorize]
    [RequiredScope("API.Access")]
    [Route("api/course")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet("{id}")]
        public async Task<CourseDTO> GetCourseAsync(int id)
        {
            var res = await _courseService.GetCourseAsync(id);
            return res;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCourseAsync([FromBody] CourseDTO courseDto)
        {
            await _courseService.CreateCourseAsync(courseDto);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourseAsync(int id, CourseDTO courseDTO)
        {
            await _courseService.UpdateCourseAsync(id, courseDTO);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourseAsync(int id)
        {
            await _courseService.DeleteCourseAsync(id);
            return Ok();
        }
    }
}