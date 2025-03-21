using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using LinguaRise.Models.Converters;
using LinguaRise.Common.Exceptions;

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
        var languages = await _languageRepository.GetAllAsync();
        return languages.Select(lng => lng.ToLanguageDTO());
    }

    public async Task<LanguageDTO> GetLanguageAsync(int id)
    {
        var language = await _languageRepository.GetAsync(id);

        if (language == null)
            throw new NotFoundException($"Language with ID {id} not found.", 404);

        return language.ToLanguageDTO();
    }
}