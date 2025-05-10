using LinguaRise.Models.DTOs;

namespace LinguaRise.Services.Interfaces;

public interface IUserService
{
    public Task<UserDTO> GetUserAsync(Guid id);
    public Task CreateUserAsync(UserDTO userDTO);
    public Task UpdateUserAsync(Guid id, UserDTO userDTO);
    public Task DeleteUserAsync(Guid id);

    public Task<IEnumerable<CourseDTO>> GetUserCoursesAsync(Guid id);
}