using LinguaRise.Models.Entities;

namespace LinguaRise.Repositories.Interfaces;

public interface ILanguageRepository
{
    public Task<IEnumerable<Language>> GetLanguageAsync();
}