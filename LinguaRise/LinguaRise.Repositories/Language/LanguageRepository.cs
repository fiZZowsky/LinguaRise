using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LinguaRise.Repositories;

public class LanguageRepository : BaseRepository<Language, int>, ILanguageRepository
{
    public LanguageRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Language>> GetUserLanguages(int userId)
    {
        return await _context.Courses
        .Where(c => c.UserId == userId && c.Language != null)
        .Include(c => c.Language)
        .Select(c => c.Language!)
        .Distinct()
        .ToListAsync();
    }
}