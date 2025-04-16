using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;

namespace LinguaRise.Repositories;

public class WordRepository : BaseRepository<Word, int>, IWordRepository
{
    public WordRepository(AppDbContext context) : base(context) { }
}
