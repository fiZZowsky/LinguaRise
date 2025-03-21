using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class Language
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Code { get; set; }
    [Required]
    public string Name { get; set; }
}