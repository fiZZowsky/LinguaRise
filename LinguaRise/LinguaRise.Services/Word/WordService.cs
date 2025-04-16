using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using LinguaRise.Models.Converters;
using LinguaRise.Common.Exceptions;
using LinguaRise.Models.Entities;

namespace LinguaRise.Services;

public class WordService : IWordService
{
    private readonly IWordRepository _wordRepository;

    public WordService(IWordRepository wordRepository)
    {
        _wordRepository = wordRepository;
    }

    public async Task<IEnumerable<WordDTO>> GetWordsAsync()
    {
        var words = await _wordRepository.GetAllAsync();
        return words.Select(word => word.ToWordDTO());
    }

    public async Task<WordDTO> GetWordAsync(int id)
    {
        try
        {
            var word = await _wordRepository.GetAsync(id);

            if (word == null)
            {
                throw new NotFoundException($"Word with ID {id} not found.", 404);
            }

            return word.ToWordDTO();
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while getting the word.", ex);
        }
    }

    public async Task CreateWordAsync(WordDTO wordDTO)
    {
        try
        {
            var newWord = wordDTO.ToWord();

            await _wordRepository.AddAsync(newWord);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while creating the word.", ex);
        }
    }

    public async Task UpdateWordAsync(int id, WordDTO wordDTO)
    {
        try
        {
            var word = await _wordRepository.GetAsync(id);

            if (word == null)
            {
                throw new NotFoundException($"Word with ID {id} not found.", 404);
            }

            var updatedWord = new Word
            {
                Id = id,
                Name = wordDTO.Name,
                LanguageId = wordDTO.LanguageId,
                Level = wordDTO.Level?.Value ?? string.Empty,
                VocabularyCategoryId = wordDTO.VocabularyCategoryId
            };

            await _wordRepository.UpdateAsync(updatedWord);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while updating the word.", ex);
        }
    }

    public async Task DeleteWordAsync(int id)
    {
        try
        {
            await _wordRepository.DeleteAsync(id);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while deleting the word.", ex);
        }
    }
}