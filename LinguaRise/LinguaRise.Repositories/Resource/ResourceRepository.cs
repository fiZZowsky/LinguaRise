using LinguaRise.DataAccess;
using LinguaRise.Models.DTOs;
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

    protected override IQueryable<Resource> IncludeNavigationProperties(IQueryable<Resource> query)
    {
        return query.Include(r => r.Language);
    }

    public async Task<IEnumerable<Resource>> GetByQueryAsync(ResourceQuery query)
    {
        IQueryable<Resource> queryable = _dbSet.Include(r => r.Language);

        if (!string.IsNullOrWhiteSpace(query.LanguageCode))
        {
            queryable = queryable.Where(r => r.Language != null && r.Language.Code == query.LanguageCode);
        }

        if (!string.IsNullOrWhiteSpace(query.Type))
        {
            queryable = queryable.Where(r => r.Type.Contains(query.Type));
        }

        return await queryable.ToListAsync();
    }
}