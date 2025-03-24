using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LinguaRise.Repositories;

public class UserRepository : BaseRepository<User, int> , IUserRepository
{
    public UserRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Course>> GetCoursesAsync(int userId)
    {
        return await _context.Courses
            .Include(c => c.Language)
            .Include(c => c.Lessons)
            .Where(c => c.UserId == userId)
            .ToListAsync();
    }
}