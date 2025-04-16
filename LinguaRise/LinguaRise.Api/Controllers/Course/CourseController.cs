using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LinguaRise.Api.Controllers.Course
{
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourseAsync(int id, CourseDTO courseDTO)
        {
            await _courseService.UpdateCourseAsync(id, courseDTO);

            return Ok();
        }
    }
}