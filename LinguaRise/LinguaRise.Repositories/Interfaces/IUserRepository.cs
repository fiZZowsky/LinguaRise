﻿using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;

namespace LinguaRise.Repositories.Interfaces;

public interface IUserRepository : IRepository<User, int>
{
    Task<IEnumerable<Course>> GetCoursesAsync(int userId);
}