using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace LinguaRise.Api.Controllers.Lesson
{
    [Authorize]
    [RequiredScope("API.Access")]
    [Route("api/lesson")]
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

        [HttpGet("{id}")]
        public async Task<LessonDTO> GetLessonAsync(int id)
        {
            var res = await _lessonService.GetLessonAsync(id);
            return res;
        }

        [HttpPost]
        public async Task<IActionResult> CreateLessonAsync([FromBody] LessonDTO lesson)
        {
            await _lessonService.CreateLessonAsync(lesson);

            return Ok();
        }

        [HttpGet("content-speech")]
        public async Task<SpeechResponseDTO> GetLessonContentSpeech([FromQuery] int categoryId,  [FromQuery] int languageId)
        {
            return await _lessonService.GetLessonContentSpeech(categoryId, languageId);
        }

        [HttpPost("evaluate-speech")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<PronunciationResultDTO>> EvaluatePronounciation([FromForm] EvaluateSpeechRequest request)
        {
            if (request.AudioFile == null || request.AudioFile.Length == 0)
                return BadRequest("No audio file");

            using var audioStream = request.AudioFile.OpenReadStream();
            PronunciationResultDTO result;

            try
            {
                result = await _lessonService.EvaluatePronounciationAsync(audioStream, request.WordId, request.CourseId, request.LessonId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Speech processing error: {ex.Message}");
            }
            return Ok(result);
        }
    }
}