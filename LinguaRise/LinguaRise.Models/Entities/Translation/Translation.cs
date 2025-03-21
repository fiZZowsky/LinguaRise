using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class Translation
{
    [Key]
    public int Id { get; set; }
    [Required]
    public int LanguageId { get; set; }
    [Required]
    public int WordId { get; set; }
    [Required]
    public string Value { get; set; }
}