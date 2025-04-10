using LinguaRise.Common.Exceptions;
using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LinguaRise.Api.Controllers.Course
{
    [ApiController]
    [Route("api/course")]
    [Authorize]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDTO>> GetCourseAsync(int id)
        {
            try
            {
                var res = await _courseService.GetCourseAsync(id);
                return Ok(res);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourseAsync(int id, CourseDTO courseDTO)
        {
            await _courseService.UpdateCourseAsync(id, courseDTO);

            return Ok();
        }
    }
}