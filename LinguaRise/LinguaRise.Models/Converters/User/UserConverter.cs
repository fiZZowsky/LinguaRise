using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;

namespace LinguaRise.Models.Converters;

public static class UserConverter
{
    public static UserDTO ToUserDTO(this User user)
    {
        return new UserDTO
        {
            Id = user.Id,
            Name = user.Name,
            Surname = user.Surname,
            Email = user.Email,
            Courses = user.Courses
        };
    }

    public static User ToUser(this UserDTO userDTO)
    {
        return new User
        {
            Id = userDTO.Id,
            Name = userDTO.Name ?? string.Empty,
            Surname = userDTO.Surname ?? string.Empty,
            Email = userDTO.Email ?? string.Empty,
            Courses = userDTO.Courses
        };
    }
}