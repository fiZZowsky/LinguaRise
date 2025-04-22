using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;

namespace LinguaRise.Models.Converters;

public static class CourseConverter
{
    public static CourseDTO ToCourseDTO(this Course course, Func<string, string, string?> translateWord)
    {
        return new CourseDTO
        {
            Id = course.Id,
            LanguageId = course.LanguageId,
            LanguageCode = course.Language?.Code,
            LanguageName = course.Language?.Name,
            UserId = course.UserId,
            UserEmail = course.User?.Email,
            UserName = course.User?.Name,
            Lessons = course.Lessons?.Select(lesson => lesson.ToLessonDTO(translateWord)).ToList() ?? new List<LessonDTO>()
        };
    }

    public static Course ToCourse(this CourseDTO courseDTO)
    {
        return new Course
        {
            Id = courseDTO.Id,
            LanguageId = courseDTO.LanguageId,
            UserId = courseDTO.UserId,
            Lessons = courseDTO.Lessons?.Select(lessonDTO => lessonDTO.ToLesson()).ToList() ?? new List<Lesson>()
        };
    }
}