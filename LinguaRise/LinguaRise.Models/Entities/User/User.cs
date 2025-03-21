using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class User
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Email { get; set; }

    public ICollection<Course> Courses { get; set; } = new List<Course>();
}