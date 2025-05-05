using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LinguaRise.Api.Controllers.Language;

[Route("api/language")]
[ApiController]
public class LanguageController : ControllerBase
{
    private readonly ILanguageService _languageService;

    public LanguageController(ILanguageService languageService)
    {
        _languageService = languageService;
    }

    [HttpGet]
    public async Task<IEnumerable<LanguageDTO>> GetLanguagesAsync()
    {
        var res = await _languageService.GetLanguagesAsync();
        return res;
    }

    [Authorize]
    [HttpGet("with-flags/user/{id?}")]
    public async Task<IEnumerable<LanguageWithFlagDTO>> GetLanguagesWithFlagsAsync([FromRoute] int? id)
    {
        var res = await _languageService.GetLanguagesWithFlagsAsync(id);
        return res;
    }

    [HttpGet("{id}")]
    public async Task<LanguageDTO> GetLanguageAsync(int id)
    {
        var res = await _languageService.GetLanguageAsync(id);
        return res;
    }

    [HttpGet("user/{id}")]
    public async Task<IEnumerable<LanguageWithFlagDTO>> GetUserLanguagesWithFlagsAsync(int id)
    {
        var res = await _languageService.GetUserLanguagesWithFlagsAsync(id);
        return res;
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> CreateLanguageAsync([FromForm] LanguageDTO languageDto, IFormFile? flagImage)
    {
        byte[]? imageBytes = null;

        if (flagImage != null && flagImage.Length > 0)
        {
            using var ms = new MemoryStream();
            await flagImage.CopyToAsync(ms);
            imageBytes = ms.ToArray();
        }

        await _languageService.CreateLanguageAsync(languageDto, imageBytes);

        return Ok();
    }

    [HttpPut("{id}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UpdateLanguageAsync(int id, [FromForm] LanguageDTO languageDto, IFormFile? flagImage)
    {
        byte[]? imageBytes = null;

        if (flagImage != null && flagImage.Length > 0)
        {
            using var ms = new MemoryStream();
            await flagImage.CopyToAsync(ms);
            imageBytes = ms.ToArray();
        }

        await _languageService.UpdateLanguageAsync(id, languageDto, imageBytes);

        return Ok();
    }
}