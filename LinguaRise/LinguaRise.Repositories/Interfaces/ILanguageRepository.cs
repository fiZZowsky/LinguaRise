using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;

namespace LinguaRise.Repositories.Interfaces;

public interface ILanguageRepository : IRepository<Language, int>
{
    Task<IEnumerable<Language>> GetUserLanguages(Guid userId);
    Task<IEnumerable<Language>> GetLanguagesNotOwnedByUserAsync(Guid? userId);
}