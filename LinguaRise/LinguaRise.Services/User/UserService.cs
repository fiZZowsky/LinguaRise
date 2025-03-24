using LinguaRise.Common.Exceptions;
using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using LinguaRise.Models.Converters;
using LinguaRise.Models.Entities;

namespace LinguaRise.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserDTO> GetUserAsync(int id)
    {
        var user = await _userRepository.GetAsync(id);

        if(user == null)
        {
            throw new NotFoundException($"User with ID {id} not found.", 404);
        }

        return user.ToUserDTO();
    }

    public async Task CreateUserAsync(UserDTO userDTO)
    {
        try
        {
            var newUser = userDTO.ToUser();

            await _userRepository.AddAsync(newUser);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while creating the user.", ex);
        }
    }

    public async Task UpdateUserAsync(int id, UserDTO userDTO)
    {
        try
        {
            var user = await _userRepository.GetAsync(id);

            if(user == null)
            {
                throw new NotFoundException($"User with ID {id} not found.", 404);
            }

            var updatedUser = new User
            {
                Id = id,
                Name = userDTO.Name ?? string.Empty,
                Email = userDTO.Email ?? string.Empty,
                Courses = userDTO.Courses
            };

            await _userRepository.UpdateAsync(updatedUser);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while updating the user.", ex);
        }
    }

    public async Task DeleteUserAsync(int id)
    {
        try
        {
            await _userRepository.DeleteAsync(id);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while deleting the user.", ex);
        }
    }

    public async Task<IEnumerable<CourseDTO>> GetUserCoursesAsync(int id)
    {
        var courses = await _userRepository.GetCoursesAsync(id);

        return courses.Select(course => course.ToCourseDTO());
    }
}