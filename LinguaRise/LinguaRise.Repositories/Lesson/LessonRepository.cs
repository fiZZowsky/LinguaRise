using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LinguaRise.Repositories;

public class LessonRepository : BaseRepository<Lesson, int>, ILessonRepository
{
    public LessonRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Lesson>> GetAllWithDetailsAsync()
    {
        return await _dbSet
        .Include(l => l.Course)
            .ThenInclude(c => c.User)
        .Include(l => l.Course)
            .ThenInclude(c => c.Language)
        .Include(l => l.LearnedWords)
            .ThenInclude(w => w.VocabularyCategory)
        .ToListAsync();
    }

    public async Task<Lesson?> GetWithDetailsAsync(int id)
    {
        return await _dbSet
            .Include(l => l.Course)
                .ThenInclude(c => c.User)
            .Include(l => l.Course)
                .ThenInclude(c => c.Language)
            .Include(l => l.LearnedWords)
                .ThenInclude(w => w.VocabularyCategory)
            .FirstOrDefaultAsync(l => l.Id == id);
    }
}