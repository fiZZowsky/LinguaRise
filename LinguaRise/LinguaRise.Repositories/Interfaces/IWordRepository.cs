using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;

namespace LinguaRise.Repositories.Interfaces;

public interface IWordRepository : IRepository<Word, int>
{
    Task<IEnumerable<Word>> GetWordsToLearn(Guid userId, int categoryId, int languageId);
    Task<string> GetTranslatedWord(int wordId, string languageCode);
}
