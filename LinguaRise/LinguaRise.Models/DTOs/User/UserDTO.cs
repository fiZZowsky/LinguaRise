using LinguaRise.Models.Entities;

namespace LinguaRise.Models.DTOs;

public class UserDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public ICollection<Course> Courses { get; set; } = new List<Course>();
}