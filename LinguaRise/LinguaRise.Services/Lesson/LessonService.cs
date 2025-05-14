using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using LinguaRise.Models.Converters;
using LinguaRise.Common.Exceptions;

namespace LinguaRise.Services;

public class LessonService : ILessonService
{
    private readonly ILessonRepository _lessonRepository;
    private readonly IResourceRepository _resourceRepository;
    private readonly ISpeechService _speechService;

    public LessonService(ILessonRepository lessonRepository, IResourceRepository resourceRepository, ISpeechService speechService)
    {
        _lessonRepository = lessonRepository;
        _resourceRepository = resourceRepository;
        _speechService = speechService;
    }

    public async Task<IEnumerable<LessonDTO>> GetLessonsAsync()
    {
        var lessons = await _lessonRepository.GetAllWithDetailsAsync();
        var result = new List<LessonDTO>();

        foreach (var lesson in lessons)
        {
            var dto = lesson.ToLessonDTO((resourceKey, languageCode) =>
            {
                return _resourceRepository.GetTranslatedWordAsync(resourceKey, languageCode).Result;
            });

            result.Add(dto);
        }

        return result;
    }

    public async Task<LessonDTO> GetLessonAsync(int id)
    {
        var lesson = await _lessonRepository.GetAsync(id);

        if (lesson == null)
            throw new NotFoundException($"Lesson with ID {id} not found.", 404);

        return lesson.ToLessonDTO((resourceKey, languageCode) =>
            _resourceRepository.GetTranslatedWordAsync(resourceKey, languageCode).Result);
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

    public async Task<SpeechResponseDTO> GetLessonContentSpeech(int languageId)
    {
        var response = await _speechService.SynthesizeAsync(languageId);
        return response;
    }
}