namespace LinguaRise.Models.DTOs;

public class SpeechItemDTO
{
    public int TextId { get; set; }
    public string Text { get; init; } = default!;
    public string AudioBase64 { get; init; } = default!;
}