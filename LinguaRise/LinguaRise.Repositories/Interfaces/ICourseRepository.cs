using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;

namespace LinguaRise.Repositories.Interfaces;

public interface ICourseRepository : IRepository<Course, int>
{
    Task<Course?> GetByUserAndLanguageAsync(Guid userId, int languageId);
    Task<Language?> GetCourseLanguage(int courseId);
}