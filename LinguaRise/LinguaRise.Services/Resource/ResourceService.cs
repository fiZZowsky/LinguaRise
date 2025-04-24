using LinguaRise.Common.Exceptions;
using LinguaRise.Models.Converters;
using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;

namespace LinguaRise.Services;

public class ResourceService : IResourceService
{
    private readonly IResourceRepository _resourceRepository;

    public ResourceService(IResourceRepository resourceRepository)
    {
        _resourceRepository = resourceRepository;
    }

    public async Task<IEnumerable<ResourceDTO>> GetResourcesAsync(ResourceQuery query)
    {
        var resources = await _resourceRepository.GetAllAsync();
        return resources.Select(res => res.ToResourceDTO()).ToList();
    }

    public async Task<ResourceDTO> GetResourceAsync(int resourceId)
    {
        var resource = await _resourceRepository.GetAsync(resourceId);

        if (resource == null)
        {
            throw new NotFoundException($"Resource with ID {resourceId} not found.", 404);
        }

        return resource.ToResourceDTO();
    }

    public async Task CreateResourceAsync(ResourceDTO resourceDTO)
    {
        try
        {
            var resource = resourceDTO.ToResource();
            await _resourceRepository.AddAsync(resource);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while creating the resource.", ex);
        }
    }

    public async Task UpdateResourceAsync(int resourceId, ResourceDTO resourceDto)
    {
        try
        {
            var resource = await _resourceRepository.GetAsync(resourceId);

            if (resource == null)
            {
                throw new NotFoundException($"Resource with ID {resourceId} not found.", 404);
            }

            var updatedResource = new Resource
            {
                Id = resourceId,
                Key = resourceDto.Key,
                Name = resourceDto.Name,
                LanguageId = resourceDto.LanguageId
            };

            await _resourceRepository.UpdateAsync(updatedResource);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while updating the resource.", ex);
        }
    }

    public async Task DeleteResourceAsync(int resourceId)
    {
        try
        {
            await _resourceRepository.DeleteAsync(resourceId);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("An error occurred while deleting the resource.", ex);
        }
    }
}