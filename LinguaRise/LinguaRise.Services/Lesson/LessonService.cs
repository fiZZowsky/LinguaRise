using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using LinguaRise.Models.Converters;
using LinguaRise.Common.Exceptions;
using LinguaRise.Common.Context.Interfaces;
using LinguaRise.Models.Entities;
using LinguaRise.Common;
using System.Linq;

namespace LinguaRise.Services;

public class LessonService : ILessonService
{
    private readonly ILessonRepository _lessonRepository;
    private readonly IResourceRepository _resourceRepository;
    private readonly ISpeechService _speechService;
    private readonly ICourseRepository _courseRepository;
    private readonly IUserContext _userContext;
    private readonly ILanguageRepository _languageRepository;
    private readonly IVocabularyCategoryRepository _vocabularyCategoryRepository;
    private readonly IWordRepository _wordRepository;

    public LessonService(ILessonRepository lessonRepository, 
        IResourceRepository resourceRepository, 
        ISpeechService speechService,
        ICourseRepository courseRepository,
        IUserContext userContext,
        ILanguageRepository languageRepository,
        IVocabularyCategoryRepository vocabularyCategoryRepository,
        IWordRepository wordRepository)
    {
        _lessonRepository = lessonRepository;
        _resourceRepository = resourceRepository;
        _speechService = speechService;
        _courseRepository = courseRepository;
        _userContext = userContext;
        _languageRepository = languageRepository;
        _vocabularyCategoryRepository = vocabularyCategoryRepository;
        _wordRepository = wordRepository;
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

    public async Task<PronunciationResultDTO> EvaluatePronunciationAsync(Stream audioStream, int wordId, int languageId, int lessonId)
    {
        var language = await _languageRepository.GetAsync(languageId);
        var response = await _speechService.EvaluatePronunciationAsync(audioStream, language, wordId);
        if (response.IsCorrect)
        {
            var lesson = await _lessonRepository.GetAsync(lessonId);
            var word = await _wordRepository.GetAsync(wordId);
            lesson.LearnedWords.Add(word);
            lesson.Score += response.Score;

            await _lessonRepository.UpdateAsync(lesson);
        }

        return response;
    }

    public async Task<SoundRecognitionResult> WritingByEarLessonValidationAsync(RecognitionValidationRequest request)
    {
        var response = new SoundRecognitionResult();
        var language = await _languageRepository.GetAsync(request.LanguageId);
        var learnedWord = await _wordRepository.GetTranslatedWord(request.WordId, language.Code);

        response.Score = StringSimilarity.CalculateSimilarity(request.RecognizedText, learnedWord);
        response.IsCorrect = response.Score > 90;

        if (response.IsCorrect)
        {
            var word = await _wordRepository.GetAsync(request.WordId);
            var lesson = await _lessonRepository.GetAsync(request.LessonId);
            lesson.LearnedWords.Add(word);
            lesson.Score += response.Score;
            await _lessonRepository.UpdateAsync(lesson);
        }

        return response;
    }

    public async Task<LessonWritingContentDTO> GetWritingLessonContent(int languageId)
    {
        const int CATEGORY = 3;

        var words = await _wordRepository.GetWordsToLearn(_userContext.UserId.Value, CATEGORY, languageId);

        var course = await _courseRepository.GetByUserAndLanguageAsync(_userContext.UserId.Value, languageId);
        var lesson = new Lesson
        {
            CourseId = course?.Id,
            CompletionDate = DateTime.UtcNow
        };

        var language = await _languageRepository.GetAsync(languageId);

        var items = new List<WritingItemDTO>();
        foreach (var word in words)
        {
            var userLangTranslation = await _resourceRepository.GetTranslatedWordAsync(word.ResourceKey, _userContext.LanguageCode);

            items.Add(new WritingItemDTO
            {
                WordId = word.Id,
                WordInUserLanguage = userLangTranslation ?? word.ResourceKey
            });
        }

        var lessonId = await _lessonRepository.AddAsync(lesson);

        var response = new LessonWritingContentDTO
        {
            LessonId = lessonId,
            Items = items
        };

        return response;
    }

    public async Task<SoundRecognitionResult> ValidateWrittenAnswerAsync(WrittenAnswerRequest request)
    {
        var response = new SoundRecognitionResult();
        var language = await _languageRepository.GetAsync(request.LanguageId);
        var learnedWord = await _wordRepository.GetTranslatedWord(request.WordId, language.Code);

        response.Score = StringSimilarity.CalculateSimilarity(request.Answer, learnedWord);
        response.IsCorrect = response.Score > 90;

        if (response.IsCorrect)
        {
            var word = await _wordRepository.GetAsync(request.WordId);
            var lesson = await _lessonRepository.GetAsync(request.LessonId);
            lesson.LearnedWords.Add(word);
            lesson.Score += response.Score;
            await _lessonRepository.UpdateAsync(lesson);
        }

        return response;
    }

    public async Task<LessonSummaryDTO> GetLessonSummaryAsync(int lessonId, int categoryId)
    {
        var lessonWithDetails = await _lessonRepository.GetWithDetailsAsync(lessonId);

        if (lessonWithDetails == null)
            throw new NotFoundException($"Lesson with ID {lessonId} not found.", 404);

        var course = lessonWithDetails.Course ?? await _courseRepository.GetAsync(lessonWithDetails.CourseId!.Value);
        var language = course.Language ?? await _languageRepository.GetAsync(course.LanguageId!.Value);

        var learnedWordsDto = new List<WordDTO>();
        foreach (var wordId in lessonWithDetails.LearnedWords.Select(x => x.Id))
        {
            var word = await _wordRepository.GetAsync(wordId);
            var translated = await _resourceRepository.GetTranslatedWordAsync(word.ResourceKey, language.Code);
            var dto = word.ToWordDTO();
            dto.Name = translated ?? word.ResourceKey;
            learnedWordsDto.Add(dto);
        }

        var category = await _vocabularyCategoryRepository.GetAsync(categoryId);

        var summary = new LessonSummaryDTO
        {
            CategoryName = category.Name,
            LanguageName = language.Name,
            LearnedWords = learnedWordsDto,
            Score = lessonWithDetails.Score,
            FlagImage = language.FlagImage != null
                ? Convert.ToBase64String(language.FlagImage)
                : null
        };

        return summary;
    }
}