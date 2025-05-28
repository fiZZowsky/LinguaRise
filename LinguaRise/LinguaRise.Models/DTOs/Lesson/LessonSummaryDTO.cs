namespace LinguaRise.Models.DTOs;

public class LessonSummaryDTO
{
    public string LanguageName { get; set; }
    public string? FlagImage { get; set; }
    public string CategoryName { get; set; }
    public ICollection<WordDTO> LearnedWords { get; set; } = new List<WordDTO>();
    public double Score { get; set; }
}
