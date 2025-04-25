using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using LinguaRise.Models.Converters;
using LinguaRise.Common.Exceptions;
using LinguaRise.Common.Context.Interfaces;

namespace LinguaRise.Services;

public class LanguageService : ILanguageService
{
    private readonly ILanguageRepository _languageRepository;
    private readonly IResourceRepository _resourceRepository;
    private readonly IUserContext _context;

    public LanguageService(ILanguageRepository languageRepository, IResourceRepository resourceRepository, IUserContext context)
    {
        _languageRepository = languageRepository;
        _resourceRepository = resourceRepository;
        _context = context;
    }

    public async Task<IEnumerable<LanguageDTO>> GetLanguagesAsync()
    {
        var languages = await _languageRepository.GetAllAsync();
        return languages.Select(lng => lng.ToLanguageDTO());
    }

    public async Task<IEnumerable<LanguageWithFlagDTO>> GetLanguagesWithFlagsAsync()
    {
        var languages = await _languageRepository.GetAllAsync();
        var result = new List<LanguageWithFlagDTO>();

        foreach (var lng in languages)
        {
            var translatedName = await _resourceRepository.GetTranslatedWordAsync(lng.Name, _context.LanguageCode);
            result.Add(lng.ToLanguageWithFlagDTO(translatedName));
        }

        return result;
    }

    public async Task<LanguageDTO> GetLanguageAsync(int id)
    {
        var language = await _languageRepository.GetAsync(id);

        if (language == null)
            throw new NotFoundException($"Language with ID {id} not found.", 404);

        return language.ToLanguageDTO();
    }

    public async Task CreateLanguageAsync(LanguageDTO languageDto, byte[] flagImage)
    {
        try
        {
            var newLanguage = languageDto.ToLanguage();
            newLanguage.FlagImage = flagImage;

            await _languageRepository.AddAsync(newLanguage);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while creating the language.", ex);
        }
    }

    public async Task UpdateLanguageAsync(int id, LanguageDTO languageDto, byte[] flagImage)
    {
        try
        {
            var language = await _languageRepository.GetAsync(id);
            if (language == null)
            {
                throw new NotFoundException($"Language with ID {id} not found.", 404);
            }

            language.Code = languageDto.Code;
            language.Name = languageDto.Name;
            language.FlagImage = flagImage;

            await _languageRepository.UpdateAsync(language);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while updating the language.", ex);
        }
    }
}