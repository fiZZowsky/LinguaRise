using LinguaRise.Models.DTOs;

namespace LinguaRise.Services.Interfaces;

public interface ILanguageService
{
    Task<IEnumerable<LanguageDTO>> GetLanguagesAsync();
    Task<IEnumerable<LanguageWithFlagDTO>> GetLanguagesWithFlagsAsync(Guid? userId);
    Task<LanguageDTO> GetLanguageAsync(int id);
    Task<IEnumerable<LanguageWithFlagDTO>> GetUserLanguagesWithFlagsAsync(Guid userId);
    Task CreateLanguageAsync(LanguageDTO languageDto, byte[] flagImage);
    Task UpdateLanguageAsync(int id, LanguageDTO languageDto, byte[] flagImage);
}