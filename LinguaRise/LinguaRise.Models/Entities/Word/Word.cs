using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class Word
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string Level { get; set; } = string.Empty;
    public int? LanguageId { get; set; }
    public int? VocabularyCategoryId { get; set; }

    public Language? Language { get; set; }
    public VocabularyCategory? VocabularyCategory { get; set; }
}