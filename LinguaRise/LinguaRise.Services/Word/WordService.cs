using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using LinguaRise.Models.Converters;
using LinguaRise.Common.Exceptions;
using LinguaRise.Models.Entities;
using LinguaRise.Common.Context.Interfaces;

namespace LinguaRise.Services;

public class WordService : IWordService
{
    private readonly IWordRepository _wordRepository;
    private readonly IUserSession _userSession;
    private readonly IResourceRepository _resourceRepository;

    public WordService(IWordRepository wordRepository, IUserSession userSession, IResourceRepository resourceRepository)
    {
        _wordRepository = wordRepository;
        _userSession = userSession;
        _resourceRepository = resourceRepository;
    }

    public async Task<IEnumerable<WordDTO>> GetWordsAsync()
    {
        var words = await _wordRepository.GetAllAsync();
        var result = new List<WordDTO>();

        foreach (var word in words)
        {
            var name = await _resourceRepository
                               .GetTranslatedWordAsync(word.ResourceKey, _userSession.LanguageCode);

            var dto = word.ToWordDTO();
            dto.Name = name ?? word.ResourceKey;
            result.Add(dto);
        }

        return result;
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

            var name = await _resourceRepository.GetTranslatedWordAsync(word.ResourceKey, _userSession.LanguageCode);
            var dto = word.ToWordDTO();
            dto.Name = name ?? word.ResourceKey;
            return dto;
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
            if (IsKeyValid(wordDTO.Name) == false)
            {
                throw new InvalidDataException("Invalid resource key name in column 'Name'.");
            }

            var newWord = wordDTO.ToWord();

            await _wordRepository.AddAsync(newWord);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while creating the word.", ex);
        }
    }

    private bool IsKeyValid(string key)
    {
        return !string.IsNullOrWhiteSpace(key) && key.All(char.IsLetterOrDigit);
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

            if (IsKeyValid(wordDTO.Name) == false)
            {
                throw new InvalidDataException("Invalid resource key name in column 'Name'.");
            }

            var updatedWord = new Word
            {
                Id = id,
                ResourceKey = wordDTO.Name,
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