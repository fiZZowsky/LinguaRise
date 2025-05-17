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
            .Where(c => c.UserId == userId)
            .SelectMany(c => c.Lessons)
            .SelectMany(l => l.LearnedWords)
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
}
