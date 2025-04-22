using LinguaRise.Common.Exceptions;
using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using LinguaRise.Models.Converters;

namespace LinguaRise.Services;

public class CourseService : ICourseService
{
    private readonly ICourseRepository _courseRepository;
    private readonly IResourceRepository _resourceRepository;

    public CourseService(ICourseRepository courseRepository, IResourceRepository resourceRepository)
    {
        _courseRepository = courseRepository;
        _resourceRepository = resourceRepository;
    }

    public async Task<CourseDTO> GetCourseAsync(int id)
    {
        var course = await _courseRepository.GetAsync(id);

        if (course == null)
        {
            throw new NotFoundException($"Course with ID {id} not found.", 404);
        }

        return course.ToCourseDTO((resourceKey, languageCode) =>
            _resourceRepository.GetTranslatedWordAsync(resourceKey, languageCode).Result);
    }

    public async Task CreateCourseAsync(CourseDTO courseDto)
    {
        try
        {
            var course = courseDto.ToCourse();
            await _courseRepository.UpdateAsync(course);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while creating the course.", ex);
        }
    }

    public async Task UpdateCourseAsync(int id, CourseDTO courseDTO)
    {
        try
        {
            var course = _courseRepository.GetAsync(id);
            if(course == null)
            {
                throw new NotFoundException($"Course with ID {id} not found.", 404);
            }

            var lessons = courseDTO.Lessons.Select(lesson => lesson.ToLesson()).ToList();

            var updatedCourse = new Course
            {
                LanguageId = courseDTO.LanguageId,
                UserId = courseDTO.UserId,
                Lessons = lessons
            };

            await _courseRepository.UpdateAsync(updatedCourse);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while updating the course.", ex);
        }
    }

    public async Task DeleteCourseAsync(int id)
    {
        try
        {
            await _courseRepository.DeleteAsync(id);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while deleting the course.", ex);
        }
    }
}