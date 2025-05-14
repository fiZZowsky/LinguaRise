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
            Culture = lang.Culture,
            VoiceName = lang.VoiceName
        };
    }

    public static Language ToLanguage(this LanguageDTO dto)
    {
        return new Language
        {
            Id = dto.Id,
            Code = dto.Code,
            Name = dto.Name,
            Culture = dto.Culture,
            VoiceName = dto.VoiceName
        };
    }

    public static LanguageWithFlagDTO ToLanguageWithFlagDTO(this Language lang, string? translatedName)
    {
        return new LanguageWithFlagDTO
        {
            Id = lang.Id,
            Code = lang.Code,
            Name = translatedName ?? lang.Name,
            FlagImage = lang.FlagImage != null ? Convert.ToBase64String(lang.FlagImage) : null
        };
    }
}