using LinguaRise.Models.DTOs;

namespace LinguaRise.Services.Interfaces
{
    public interface IResourceService
    {
        Task<IEnumerable<ResourceDTO>> GetResourcesAsync(ResourceQuery query);
        Task<ResourceDTO> GetResourceAsync(int resourceId);
        Task CreateResourceAsync(ResourceDTO resourceDTO);
        Task UpdateResourceAsync(int resourceId, ResourceDTO resource);
        Task DeleteResourceAsync(int resourceId);
    }
}