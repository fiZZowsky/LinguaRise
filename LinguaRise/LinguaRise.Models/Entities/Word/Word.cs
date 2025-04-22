using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class Word
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string ResourceKey { get; set; } = string.Empty;
    [Required]
    public string Level { get; set; } = string.Empty;
    public int? VocabularyCategoryId { get; set; }

    public VocabularyCategory? VocabularyCategory { get; set; }
}