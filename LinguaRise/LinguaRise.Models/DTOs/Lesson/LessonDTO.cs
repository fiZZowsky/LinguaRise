namespace LinguaRise.Models.DTOs;

public class LessonDTO
{
    public int Id { get; set; }
    public int? CourseId { get; set; }
    public Guid? UserId { get; set; }
    public string? UserEmail { get; set; }
    public string? UserName { get; set; }
    public int? LanguageId { get; set; }
    public string? LanguageCode { get; set; }
    public string? LanguageName { get; set; }
    public DateTime CompletionDate { get; set; }
    public ICollection<WordDTO> LearnedWords { get; set; } = new List<WordDTO>();
}