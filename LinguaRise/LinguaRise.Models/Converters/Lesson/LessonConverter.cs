using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;
using LinguaRise.Models.Enums;

namespace LinguaRise.Models.Converters;

public static class LessonConverter
{
    public static LessonDTO ToLessonDTO(this Lesson lesson)
    {
        return new LessonDTO
        {
            Id = lesson.Id,
            CourseId = lesson.CourseId,
            CompletionDate = lesson.CompletionDate,
            UserId = lesson.Course?.UserId,
            UserEmail = lesson.Course?.User?.Email,
            UserName = lesson.Course?.User?.Name,
            LanguageId = lesson.Course?.LanguageId,
            LanguageCode = lesson.Course?.Language?.Code,
            LanguageName = lesson.Course?.Language?.Name,
            LearnedWords = lesson.LearnedWords?.Select(word => new WordDTO
            {
                Id = word.Id,
                Name = word.Name,
                Level = Level.FromValue(word.Level),
                LanguageId = word.LanguageId,
                LanguageCode = word.Language?.Code,
                VocabularyCategoryId = word.VocabularyCategory?.Id,
                VocabularyCategoryName = word.VocabularyCategory?.Name
            }).ToList() ?? new List<WordDTO>()
        };
    }

    public static Lesson ToLesson(this LessonDTO lessonDTO)
    {
        return new Lesson
        {
            Id = lessonDTO.Id,
            CourseId = lessonDTO.CourseId ?? 0,
            CompletionDate = lessonDTO.CompletionDate,
            Course = new Course
            {
                Id = lessonDTO.CourseId ?? 0,
                UserId = lessonDTO.UserId ?? 0,
                LanguageId = lessonDTO.LanguageId ?? 0,
                User = lessonDTO.UserId.HasValue ? new User
                {
                    Id = lessonDTO.UserId.Value,
                    Email = lessonDTO.UserEmail,
                    Name = lessonDTO.UserName
                } : null,
                Language = lessonDTO.LanguageId.HasValue ? new Language
                {
                    Id = lessonDTO.LanguageId.Value,
                    Code = lessonDTO.LanguageCode,
                    Name = lessonDTO.LanguageName
                } : null
            },
            LearnedWords = lessonDTO.LearnedWords?.Select(wordDTO => new Word
            {
                Id = wordDTO.Id,
                Name = wordDTO.Name,
                Level = Level.ToValue(wordDTO.Level),
                LanguageId = wordDTO.LanguageId ?? 0,
                VocabularyCategoryId = wordDTO.VocabularyCategoryId ?? 0,
                VocabularyCategory = wordDTO.VocabularyCategoryId.HasValue ? new VocabularyCategory
                {
                    Id = wordDTO.VocabularyCategoryId.Value,
                    Name = wordDTO.VocabularyCategoryName
                } : null
            }).ToList()
        };
    }
}