using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LinguaRise.Api.Controllers.Language;

[Route("api/[controller]")]
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
}