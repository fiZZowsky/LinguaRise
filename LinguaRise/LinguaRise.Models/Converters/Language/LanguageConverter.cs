using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;

namespace LinguaRise.Models.Converters;

public static class LanguageConverter
{
    public static LanguageDTO ToLanguageDTO(this Language lang)
    {
        return new LanguageDTO
        {
            Id = lang.Id,
            Code = lang.Code,
            Name = lang.Name,
            FlagImage = lang.FlagImage
        };
    }

    public static Language ToLanguage(this LanguageDTO dto)
    {
        return new Language
        {
            Id = dto.Id,
            Code = dto.Code,
            Name = dto.Name,
            FlagImage = dto.FlagImage
        };
    }
}