using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class Course
{
    [Key]
    public int Id { get; set; }
    [Required]
    public int LanguageId { get; set; }
    [Required]
    public DateTime CompletionDate { get; set; }
}