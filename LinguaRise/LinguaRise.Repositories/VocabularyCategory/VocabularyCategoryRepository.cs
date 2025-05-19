using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;

namespace LinguaRise.Repositories;

public class VocabularyCategoryRepository : BaseRepository<VocabularyCategory, int>, IVocabularyCategoryRepository
{
    public VocabularyCategoryRepository(AppDbContext context) : base(context) { }
}
