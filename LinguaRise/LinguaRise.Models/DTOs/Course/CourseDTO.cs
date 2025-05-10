namespace LinguaRise.Models.DTOs;

public class CourseDTO
{
    public int Id { get; set; }
    public Guid? UserId { get; set; }
    public string? UserName { get; set; }
    public string? UserEmail { get; set; }
    public int? LanguageId { get; set; }
    public string? LanguageCode { get; set; }
    public string? LanguageName { get; set; }
    public ICollection<LessonDTO> Lessons { get; set; } = new List<LessonDTO>();
}