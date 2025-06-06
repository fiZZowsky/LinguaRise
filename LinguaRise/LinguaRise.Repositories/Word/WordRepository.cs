using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LinguaRise.Repositories;

public class WordRepository : BaseRepository<Word, int>, IWordRepository
{
    public WordRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Word>> GetWordsToLearn(Guid userId, int categoryId, int languageId)
    {
        var learnedWordIds = await _context.Courses
            .Where(c =>
                c.UserId == userId &&
                c.LanguageId == languageId)
            .SelectMany(c => c.Lessons)
            .SelectMany(l => l.LearnedWords)
            .Where(w => w.VocabularyCategoryId == categoryId)
            .Select(w => w.Id)
            .Distinct()
            .ToListAsync();

        var wordsToLearn = await _context.Words
            .Where(w =>
                w.VocabularyCategoryId == categoryId
                && _context.Resources.Any(r =>
                       r.Key == w.ResourceKey
                    && r.LanguageId == languageId
                )
                && !learnedWordIds.Contains(w.Id)
            )
            .OrderBy(w => w.Id)
            .Take(10)
            .ToListAsync();

        return wordsToLearn;
    }

    public async Task<string> GetTranslatedWord(int wordId, string languageCode)
    {
        var word = await _context.Words
            .FirstOrDefaultAsync(w => w.Id == wordId);

        var translatedWord = await _context.Resources
            .Include(r => r.Language)
            .Where(r => r.Key == word.ResourceKey 
            && r.Language.Code == languageCode)
            .Select(r => r.Name)
            .FirstOrDefaultAsync();

        return translatedWord;
    }
}
