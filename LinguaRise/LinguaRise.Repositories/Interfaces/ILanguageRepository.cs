using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;

namespace LinguaRise.Repositories.Interfaces;

public interface ILanguageRepository : IRepository<Language, int>
{
    Task<IEnumerable<Language>> GetUserLanguages(int userId);
    Task<IEnumerable<Language>> GetLanguagesNotOwnedByUserAsync(int? userId);
}