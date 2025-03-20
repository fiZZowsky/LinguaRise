using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LinguaRise.Repositories;

public class LanguageRepository : BaseRepository<Language, int>, ILanguageRepository
{
    public LanguageRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Language>> GetLanguageAsync()
    {
        return await _dbSet.ToListAsync();
    }
}