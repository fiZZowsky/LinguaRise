using LinguaRise.Models.DTOs;

namespace LinguaRise.Services.Interfaces;

public interface ICourseService
{
    Task<CourseDTO> GetCourseAsync(int id);
    Task CreateCourseAsync(CourseDTO courseDTO);
    Task UpdateCourseAsync(int id, CourseDTO courseDTO);
    Task DeleteCourseAsync(int id);
}
