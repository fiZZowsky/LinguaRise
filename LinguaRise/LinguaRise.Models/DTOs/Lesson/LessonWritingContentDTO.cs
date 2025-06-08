namespace LinguaRise.Models.DTOs;

public class LessonWritingContentDTO
{
    public int LessonId { get; set; }
    public IReadOnlyList<WritingItemDTO> Items { get; set; } = default!;
}
