using LinguaRise.Models.DTOs;

namespace LinguaRise.Services.Interfaces;

public interface IWordService
{
    public Task<IEnumerable<WordDTO>> GetWordsAsync();
    public Task<WordDTO> GetWordAsync(int id);
    public Task CreateWordAsync(WordDTO wordDTO);
    public Task UpdateWordAsync(int id, WordDTO wordDTO);
    public Task DeleteWordAsync(int id);
}