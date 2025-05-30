﻿using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;
using LinguaRise.Models.Enums;

namespace LinguaRise.Models.Converters;

public static class WordConverter
{
    public static WordDTO ToWordDTO(this Word word)
    {
        return new WordDTO
        {
            Id = word.Id,
            Level = string.IsNullOrWhiteSpace(word.Level) ? null : Level.FromValue(word.Level),
            VocabularyCategoryId = word.VocabularyCategoryId,
            VocabularyCategoryName = word.VocabularyCategory?.Name
        };
    }

    public static Word ToWord(this WordDTO wordDTO)
    {
        return new Word
        {
            Id = wordDTO.Id,
            ResourceKey = wordDTO.Name,
            VocabularyCategoryId = wordDTO.VocabularyCategoryId,
            Level = wordDTO.Level?.Value ?? string.Empty
        };
    }

    public static WordToLearnDTO ToWordToLearnDTO(this Word word, string translatedWord)
    {
        return new WordToLearnDTO
        {
            Id = word.Id,
            Name = translatedWord
        };
    }
}
