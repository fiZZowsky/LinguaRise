﻿using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using LinguaRise.Models.Converters;
using LinguaRise.Common.Exceptions;
using LinguaRise.Common.Context.Interfaces;
using LinguaRise.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LinguaRise.Services;

public class LessonService : ILessonService
{
    private readonly ILessonRepository _lessonRepository;
    private readonly IResourceRepository _resourceRepository;
    private readonly ISpeechService _speechService;
    private readonly ICourseRepository _courseRepository;
    private readonly IUserContext _userContext;

    public LessonService(ILessonRepository lessonRepository, 
        IResourceRepository resourceRepository, 
        ISpeechService speechService,
        ICourseRepository courseRepository,
        IUserContext userContext)
    {
        _lessonRepository = lessonRepository;
        _resourceRepository = resourceRepository;
        _speechService = speechService;
        _courseRepository = courseRepository;
        _userContext = userContext;
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

    public async Task<SpeechResponseDTO> GetLessonContentSpeech(int categoryId, int languageId)
    {
        var response = await _speechService.SynthesizeAsync(categoryId, languageId);
        var userCourse = await _courseRepository.GetByUserAndLanguageAsync(_userContext.UserId.Value, languageId);

        var lesson = new Lesson
        {
            CourseId = userCourse.Id,
            CompletionDate = DateTime.UtcNow
        };

        response.lessonId = await _lessonRepository.AddAsync(lesson);

        return response;
    }
}