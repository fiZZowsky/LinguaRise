using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LinguaRise.Repositories;

public class CourseRepository : BaseRepository<Course, int>, ICourseRepository
{
    public CourseRepository(AppDbContext context) : base(context) { }

    public async Task<Course?> GetByUserAndLanguageAsync(Guid userId, int languageId)
    {
        return await _context.Courses
            .FirstOrDefaultAsync(c =>
                c.UserId == userId
                && c.LanguageId == languageId
            );
    }

    public async Task<Language?> GetCourseLanguage(int courseId)
    {
        return await _context.Courses
            .Where(c => c.Id == courseId)
            .Select(c => c.Language)
            .FirstOrDefaultAsync();
    }
}