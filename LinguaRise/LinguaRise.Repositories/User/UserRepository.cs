using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;

namespace LinguaRise.Repositories;

public class UserRepository : BaseRepository<User, int> , IUserRepository
{
    public UserRepository(AppDbContext context) : base(context) { }
}