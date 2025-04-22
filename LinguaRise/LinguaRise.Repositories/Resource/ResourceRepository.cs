using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LinguaRise.Repositories;

public class ResourceRepository : BaseRepository<Resource, int>, IResourceRepository
{
    public ResourceRepository(AppDbContext context) : base(context) { }

    public async Task<string?> GetTranslatedWordAsync(string resourceKey, string languageCode)
    {
        return await _context.Resources
            .Include(r => r.Language)
            .Where(r => r.Key == resourceKey && r.Language.Code == languageCode)
            .Select(r => r.Name)
            .FirstOrDefaultAsync();
    }
}