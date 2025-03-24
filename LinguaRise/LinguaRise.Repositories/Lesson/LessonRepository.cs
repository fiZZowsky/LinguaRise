using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;

namespace LinguaRise.Repositories;

public class LessonRepository : BaseRepository<Lesson, int>, ILessonRepository
{
    public LessonRepository(AppDbContext context) : base(context) { }
}