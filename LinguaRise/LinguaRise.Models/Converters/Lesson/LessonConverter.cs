using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;

namespace LinguaRise.Models.Converters;

public static class LessonConverter
{
    public static LessonDTO ToLessonDTO(this Lesson lesson)
    {
        return new LessonDTO
        {
            Id = lesson.Id,
            CourseId = lesson.CourseId,
            CompletionDate = lesson.CompletionDate
        };
    }

    public static Lesson ToLesson(this LessonDTO lesson)
    {
        return new Lesson
        {
            Id = lesson.Id,
            CourseId = lesson.CourseId,
            CompletionDate = lesson.CompletionDate
        };
    }
}