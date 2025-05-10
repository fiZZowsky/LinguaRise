using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class Course
{
    [Key]
    public int Id { get; set; }
    public Guid? UserId { get; set; }
    public int? LanguageId { get; set; }

    public User? User { get; set; }
    public Language? Language { get; set; }
    public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}