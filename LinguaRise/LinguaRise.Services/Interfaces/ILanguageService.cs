using LinguaRise.Models.DTOs;

namespace LinguaRise.Services.Interfaces;

public interface ILanguageService
{
    public Task<IEnumerable<LanguageDTO>> GetLanguagesAsync();
    public Task<LanguageDTO> GetLanguageAsync(int id);
}