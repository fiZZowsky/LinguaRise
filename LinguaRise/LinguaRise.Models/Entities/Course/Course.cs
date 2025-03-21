using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class Course
{
    [Key]
    public int Id { get; set; }
    [Required]
    public int UserId { get; set; }
    [Required]
    public int LanguageId { get; set; }

    public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}