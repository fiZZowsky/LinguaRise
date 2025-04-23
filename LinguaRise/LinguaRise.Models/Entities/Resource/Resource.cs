using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class Resource
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Key { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public int LanguageId {get; set; }
    [Required]
    public string Type { get; set; } = string.Empty;

    public Language? Language { get; set; }
}