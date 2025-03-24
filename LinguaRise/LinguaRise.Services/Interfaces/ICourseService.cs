using LinguaRise.Models.DTOs;

namespace LinguaRise.Services.Interfaces;

public interface ICourseService
{
    public Task<CourseDTO> GetCourseAsync(int id);
    public Task UpdateCourseAsync(int id, CourseDTO courseDTO);
}
