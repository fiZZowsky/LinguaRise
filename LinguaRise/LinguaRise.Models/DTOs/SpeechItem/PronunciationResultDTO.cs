namespace LinguaRise.Models.DTOs;

public class PronunciationResultDTO
{
    public bool IsCorrect { get; set; }
    public double Score { get; set; }
    public string? RecognizedText { get; set; }
}
