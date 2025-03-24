using LinguaRise.Models.DTOs;

namespace LinguaRise.Services.Interfaces;

public interface IUserService
{
    public Task<UserDTO> GetUserAsync(int id);
    public Task CreateUserAsync(UserDTO userDTO);
    public Task UpdateUserAsync(int id, UserDTO userDTO);
    public Task DeleteUserAsync(int id);
}