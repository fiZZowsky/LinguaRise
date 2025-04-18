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
            Name = word.Name,
            LanguageId = word.LanguageId,
            LanguageCode = word.Language?.Code,
            Level = Level.FromValue(word.Level),
            VocabularyCategoryId = word.VocabularyCategoryId,
            VocabularyCategoryName = word.VocabularyCategory?.Name
        };
    }

    public static Word ToWord(this WordDTO wordDTO)
    {
        return new Word
        {
            Id = wordDTO.Id,
            Name = wordDTO.Name,
            LanguageId = wordDTO.LanguageId,
            VocabularyCategoryId = wordDTO.VocabularyCategoryId,
            Level = wordDTO.Level?.Value ?? string.Empty
        };
    }
}
