using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using LinguaRise.Models.Converters;

namespace LinguaRise.Services;

public class VocabularyCategoryService : IVocabularyCategoryService
{
    private readonly IVocabularyCategoryRepository _vocabularyCategoryRepository;

    public VocabularyCategoryService(IVocabularyCategoryRepository vocabularyCategoryRepository)
    {
        _vocabularyCategoryRepository = vocabularyCategoryRepository;
    }

    public async Task<IEnumerable<VocabularyCategoryDTO>> GetVocabularyCategories()
    {
        var categories = await _vocabularyCategoryRepository.GetAllAsync();
        return categories.Select(x => x.ToCategoryDTO());
    }

    public async Task<VocabularyCategoryDTO> GetVocabularyCategory(int id)
    {
        var category = await _vocabularyCategoryRepository.GetAsync(id);
        return category.ToCategoryDTO();
    }

    public async Task CreateVocabularyCategory(VocabularyCategoryDTO categoryDTO)
    {
        try
        {
            var category = categoryDTO.ToCategory();
            await _vocabularyCategoryRepository.AddAsync(category);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while creating the category.", ex);
        }
    }

    public async Task DeleteVocabularyCategory(int id)
    {
        await _vocabularyCategoryRepository.DeleteAsync(id);
    }
}
