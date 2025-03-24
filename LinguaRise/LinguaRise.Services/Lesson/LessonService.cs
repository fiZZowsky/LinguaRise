using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using LinguaRise.Models.Converters;
using LinguaRise.Common.Exceptions;

namespace LinguaRise.Services;

public class LessonService : ILessonService
{
    private readonly ILessonRepository _lessonRepository;

    public LessonService(ILessonRepository lessonRepository)
    {
        _lessonRepository = lessonRepository;
    }

    public async Task<IEnumerable<LessonDTO>> GetLessonsAsync()
    {
        var lessons = await _lessonRepository.GetAllWithDetailsAsync();
        return lessons.Select(lesson => lesson.ToLessonDTO());
    }

    public async Task<LessonDTO> GetLessonAsync(int id)
    {
        var lesson = await _lessonRepository.GetAsync(id);

        if(lesson == null)
        {
            throw new NotFoundException($"Lesson with ID {id} not found.", 404);
        }

        return lesson.ToLessonDTO();
    }

    public async Task CreateLessonAsync(LessonDTO dto)
    {
        try
        {
            var model = dto.ToLesson();
            await _lessonRepository.AddAsync(model);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while creating the lesson.", ex);
        }
    }
}