using LinguaRise.Models.DTOs;

namespace LinguaRise.Services.Interfaces;

public interface ILanguageService
{
    Task<IEnumerable<LanguageDTO>> GetLanguagesAsync();
    Task<IEnumerable<LanguageWithFlagDTO>> GetLanguagesWithFlagsAsync();
    Task<LanguageDTO> GetLanguageAsync(int id);
    Task CreateLanguageAsync(LanguageDTO languageDto, byte[] flagImage);
}