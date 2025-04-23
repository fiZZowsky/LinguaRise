using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
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

    [HttpGet("{id}")]
    public async Task<LanguageDTO> GetLanguageAsync(int id)
    {
        var res = await _languageService.GetLanguageAsync(id);
        return res;
    }

    //[HttpPost]
    //public async Task<IActionResult> CreateLanguageAsync([FromForm] IFormFile flag, [FromForm] string code, [FromForm] string name)
    //{
    //    byte[]? flagImage = null;

    //    if (flag != null && flag.Length > 0)
    //    {
    //        using var ms = new MemoryStream();
    //        await flag.CopyToAsync(ms);
    //        flagImage = ms.ToArray();
    //    }

    //    await _languageService.CreateLanguageAsync(flagImage, code, name);

    //    return Ok();
    //}
}