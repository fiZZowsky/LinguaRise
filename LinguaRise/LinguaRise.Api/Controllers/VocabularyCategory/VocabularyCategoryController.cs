using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace LinguaRise.Api.Controllers.VocabularyCategory
{
    [Authorize]
    [RequiredScope("API.Access")]
    [Route("api/vocabulary-category")]
    [ApiController]
    public partial class VocabularyCategoryController : ControllerBase
    {
        private readonly IVocabularyCategoryService _vocabularyCategoryService;

        public VocabularyCategoryController(IVocabularyCategoryService vocabularyCategoryService)
        {
            _vocabularyCategoryService = vocabularyCategoryService;
        }

        [HttpGet]
        public async Task<IEnumerable<VocabularyCategoryDTO>> GetVocabularyCategories()
        {
            var categories = await _vocabularyCategoryService.GetVocabularyCategories();
            return categories;
        }

        [HttpGet("{id}")]
        public async Task<VocabularyCategoryDTO> GetVocabularyCategory(int id)
        {
            var category = await _vocabularyCategoryService.GetVocabularyCategory(id);
            return category;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVocabularyCategory([FromBody] VocabularyCategoryDTO vocabularyCategoryDTO)
        {
            await _vocabularyCategoryService.CreateVocabularyCategory(vocabularyCategoryDTO);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVocabularyCategory(int id)
        {
            await _vocabularyCategoryService.DeleteVocabularyCategory(id);
            return Ok();
        }
    }
}
