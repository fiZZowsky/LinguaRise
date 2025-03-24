using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;

namespace LinguaRise.Repositories;

public class CourseRepository : BaseRepository<Course, int>, ICourseRepository
{
    public CourseRepository(AppDbContext context) : base(context) { }
}