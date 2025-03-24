using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class Lesson
{
    [Key]
    public int Id { get; set; }
    public int? CourseId { get; set; }
    [Required]
    public DateTime CompletionDate { get; set; }

    public Course? Course { get; set; }
    public ICollection<Word> LearnedWords { get; set; } = new List<Word>();
}