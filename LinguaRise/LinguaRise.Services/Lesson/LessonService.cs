using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;

namespace LinguaRise.Services;

public class LessonService : ILessonService
{
    private readonly ILessonRepository _lessonRepository;

    public LessonService(ILessonRepository lessonRepository)
    {
        _lessonRepository = lessonRepository;
    }

    // TODO: Aktualnie brak mapowań dla Course, User, Language, LearnedWords
    public async Task<IEnumerable<LessonDTO>> GetLessonsAsync()
    {
        var lessons = await _lessonRepository.GetAllAsync();
        return lessons.Select(lesson => lesson.ToLessonDTO());
    }

    // TODO: Brak zabezpieczeń dla braku lekcji
    public async Task<LessonDTO> GetLessonAsync(int id)
    {
        var lesson = await _lessonRepository.GetAsync(id);
        return lesson.ToLessonDTO();
    }

    // TODO: Brak zabezpieczeń dla błędu tworzenia nowej lekcji
    public async Task<LessonDTO> CreateLessonAsync(LessonDTO dto)
    {
        var model = dto.ToLesson();
        var res = await _lessonRepository.AddAsync(model);
        return res.ToLessonDTO();
    }
}