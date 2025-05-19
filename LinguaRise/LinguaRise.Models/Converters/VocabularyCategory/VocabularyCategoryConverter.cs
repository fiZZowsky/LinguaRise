using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;

namespace LinguaRise.Models.Converters;

public static class VocabularyCategoryConverter
{
    public static VocabularyCategoryDTO ToCategoryDTO(this VocabularyCategory category)
    {
        return new VocabularyCategoryDTO
        {
            Id = category.Id,
            Name = category.Name
        };
    }

    public static VocabularyCategory ToCategory(this VocabularyCategoryDTO categoryDTO)
    {
        return new VocabularyCategory
        {
            Id = categoryDTO.Id,
            Name = categoryDTO.Name
        };
    }
}
