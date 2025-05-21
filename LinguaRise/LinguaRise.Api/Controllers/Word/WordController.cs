using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace LinguaRise.Api.Controllers.Word
{
    [Authorize]
    [RequiredScope("API.Access")]
    [Route("api/word")]
    [ApiController]
    public class WordController : ControllerBase
    {
        private readonly IWordService _wordService;

        public WordController(IWordService wordService)
        {
            _wordService = wordService;
        }

        [HttpGet]
        public async Task<IEnumerable<WordDTO>> GetWordsAsync()
        {
            var res = await _wordService.GetWordsAsync();
            return res;
        }

        [HttpGet("{id}")]
        public async Task<WordDTO> GetWordAsync(int id)
        {
            var res = await _wordService.GetWordAsync(id);
            return res;
        }

        [HttpPost]
        public async Task<IActionResult> CreateWordAsync([FromBody] WordDTO wordDTO)
        {
            await _wordService.CreateWordAsync(wordDTO);
            return Ok();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWordAsync(int id, WordDTO wordDTO)
        {
            await _wordService.UpdateWordAsync(id, wordDTO);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWordAsync(int id)
        {
            await _wordService.DeleteWordAsync(id);
            return Ok();
        }
    }
}
