using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;

namespace LinguaRise.Models.Converters;

public static class LanguageConverter
{
    public static LanguageDTO ToLanguageDTO(this Language lang)
    {
        return new LanguageDTO
        {
            Id = lang.Id,
            Code = lang.Code,
            Name = lang.Name
        };
    }

    public static Language ToLanguage(this LanguageDTO dto)
    {
        return new Language
        {
            Id = dto.Id,
            Code = dto.Code,
            Name = dto.Name
        };
    }

    public static LanguageWithFlagDTO ToLanguageWithFlagDTO(this Language lang)
    {
        return new LanguageWithFlagDTO
        {
            Id = lang.Id,
            Code = lang.Code,
            Name = lang.Name,
            FlagImage = lang.FlagImage != null ? Convert.ToBase64String(lang.FlagImage) : null
        };
    }
}