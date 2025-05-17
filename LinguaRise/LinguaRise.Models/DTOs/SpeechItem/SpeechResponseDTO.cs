namespace LinguaRise.Models.DTOs;

public class SpeechResponseDTO
{
    public int lessonId { get; set; }
    public IReadOnlyList<SpeechItemDTO> Items { get; set; } = default!;
}