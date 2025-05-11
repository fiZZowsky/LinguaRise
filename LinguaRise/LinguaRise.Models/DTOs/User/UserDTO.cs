using LinguaRise.Models.Entities;

namespace LinguaRise.Models.DTOs;

public class UserDTO
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Surname { get; set; }
    public string? Email { get; set; }
    public ICollection<Course> Courses { get; set; } = new List<Course>();
}