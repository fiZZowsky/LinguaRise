using LinguaRise.Models.DTOs;
using System.Security.Claims;

namespace LinguaRise.Services.Interfaces;

public interface IUserService
{
    public Task<UserDTO> GetUserAsync(Guid id);
    public Task CreateUserAsync(UserDTO userDTO);
    public Task UpdateUserAsync(Guid id, UserDTO userDTO);
    public Task DeleteUserAsync(Guid id);
    public Task LogIn(ClaimsPrincipal user);

    public Task<IEnumerable<CourseDTO>> GetUserCoursesAsync(Guid id);
}