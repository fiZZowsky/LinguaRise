using LinguaRise.Models.DTOs;
using System;
namespace LinguaRise.Services.Interfaces;

public interface IVocabularyCategoryService
{
    Task<IEnumerable<VocabularyCategoryDTO>> GetVocabularyCategories();
    Task<VocabularyCategoryDTO> GetVocabularyCategory(int id);
    Task CreateVocabularyCategory(VocabularyCategoryDTO categoryDTO);
    Task DeleteVocabularyCategory(int id);
}