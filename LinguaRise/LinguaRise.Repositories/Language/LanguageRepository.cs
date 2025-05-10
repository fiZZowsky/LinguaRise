using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LinguaRise.Repositories;

public class LanguageRepository : BaseRepository<Language, int>, ILanguageRepository
{
    public LanguageRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Language>> GetUserLanguages(Guid userId)
    {
        return await _context.Courses
        .Where(c => c.UserId == userId && c.Language != null)
        .Include(c => c.Language)
        .Select(c => c.Language!)
        .Distinct()
        .ToListAsync();
    }

    public async Task<IEnumerable<Language>> GetLanguagesNotOwnedByUserAsync(Guid? userId)
    {
        var allLanguages = await _context.Languages.ToListAsync();

        if (!userId.HasValue)
        {
            return allLanguages;
        }

        var userLanguageIds = await _context.Courses
            .Where(c => c.UserId == userId)
            .Select(c => c.LanguageId)
            .Where(id => id.HasValue)
            .Distinct()
            .ToListAsync();

        var result = allLanguages
            .Where(l => !userLanguageIds.Contains(l.Id))
            .ToList();

        return result;
    }
}