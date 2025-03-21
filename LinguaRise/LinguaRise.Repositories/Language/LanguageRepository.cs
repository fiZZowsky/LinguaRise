using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;

namespace LinguaRise.Repositories;

public class LanguageRepository : BaseRepository<Language, int>, ILanguageRepository
{
    public LanguageRepository(AppDbContext context) : base(context) { }
}