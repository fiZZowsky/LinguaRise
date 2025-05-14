namespace LinguaRise.Models.DTOs;

public class SpeechResponseDTO
{
    public IReadOnlyList<SpeechItemDTO> Items { get; init; } = default!;
}