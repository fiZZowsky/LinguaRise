namespace LinguaRise.Models.DTOs;

public class WrittenAnswerRequest
{
    public string Answer { get; set; } = string.Empty;
    public int LessonId { get; set; }
    public int WordId { get; set; }
    public int LanguageId { get; set; }
}
