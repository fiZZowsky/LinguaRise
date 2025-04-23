using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;

namespace LinguaRise.Models.Converters;

public static class ResourceConverter
{
    public static ResourceDTO ToResourceDTO(this Resource resource)
    {
        return new ResourceDTO()
        {
            Id = resource.Id,
            Key = resource.Key,
            Name = resource.Name,
            LanguageId = resource.LanguageId,
            LanguageCode = resource.Language?.Code,
            LanguageName = resource.Language?.Name,
            Type = resource.Type
        };
    }

    public static Resource ToResource(this ResourceDTO resourceDTO)
    {
        return new Resource()
        {
            Id = resourceDTO.Id,
            Key = resourceDTO.Key,
            Name = resourceDTO.Name,
            LanguageId = resourceDTO.LanguageId,
            Type = resourceDTO.Type
        };
    }
}