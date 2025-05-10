using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;

namespace LinguaRise.Repositories.Interfaces;

public interface IUserRepository : IRepository<User, Guid>
{
    Task<IEnumerable<Course>> GetCoursesAsync(Guid userId);
}