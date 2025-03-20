using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using LinguaRise.Models.Converters;

namespace LinguaRise.Services;

public class LanguageService : ILanguageService
{
    private readonly ILanguageRepository _languageRepository;

    public LanguageService(ILanguageRepository languageRepository)
    {
        _languageRepository = languageRepository;
    }

    public async Task<IEnumerable<LanguageDTO>> GetLanguagesAsync()
    {
        var languages = await _languageRepository.GetLanguageAsync();
        var res = languages.Select(lng => lng.ToLanguageDTO());
        return res;
    }
}