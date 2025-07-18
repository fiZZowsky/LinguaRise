﻿using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;

namespace LinguaRise.Repositories.Interfaces;

public interface ILessonRepository : IRepository<Lesson, int>
{
    Task<IEnumerable<Lesson>> GetAllWithDetailsAsync();
    Task<Lesson?> GetWithDetailsAsync(int id);
}