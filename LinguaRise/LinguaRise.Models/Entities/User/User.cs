using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class User
{
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string Surname { get; set; } = string.Empty;
    [Required]
    public string Email { get; set; } = string.Empty;

    public ICollection<Course> Courses { get; set; } = new List<Course>();
}