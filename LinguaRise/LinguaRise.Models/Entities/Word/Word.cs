using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class Word
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Level { get; set; }
    [Required]
    public int LanguageId { get; set; }
    [Required]
    public int VocabularyCategoryId { get; set; }

    public Language Language { get; set; }
    public VocabularyCategory Category { get; set; }
}