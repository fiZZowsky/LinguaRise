using LinguaRise.DataAccess;
using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;

namespace LinguaRise.Repositories.Interfaces;

public interface IResourceRepository : IRepository<Resource, int>
{
    Task<string?> GetTranslatedWordAsync(string resourceKey, string languageCode);
    Task<IEnumerable<Resource>> GetByQueryAsync(ResourceQuery query);
}