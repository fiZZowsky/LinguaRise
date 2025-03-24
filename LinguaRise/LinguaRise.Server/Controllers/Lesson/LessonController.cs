using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LinguaRise.Api.Controllers.Lesson
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ILessonService _lessonService;

        public LessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        [HttpGet]
        public async Task<IEnumerable<LessonDTO>> GetLessonsAsync()
        {
            var res = await _lessonService.GetLessonsAsync();
            return res;
        }
#
        [HttpGet("{id}")]
        public async Task<LessonDTO> GetLessonAsync(int id)
        {
            var res = _lessonService.GetLessonAsync(id);
            return res;
        }

        [HttpPost]
        public async Task<LessonDTO> CreateLessonAsync([FromBody] LessonDTO lesson)
        {
            var res = _lessonService.CreateLessonAsync(lesson);
            return res;
        }
    }
}