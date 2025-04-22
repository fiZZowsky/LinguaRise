using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LinguaRise.Api.Controllers.Resource
{
    [Route("api/resource")]
    [ApiController]
    public class ResourceController : ControllerBase
    {
        private readonly IResourceService _resourceService;

        public ResourceController(IResourceService resourceService)
        {
            _resourceService = resourceService;
        }

        [HttpGet]
        public async Task<IEnumerable<ResourceDTO>> GetResourcesAsync()
        {
            var resources = await _resourceService.GetResourcesAsync();
            return resources;
        }

        [HttpGet("{id}")]
        public async Task<ResourceDTO> GetResourceAsync(int id)
        {
            var resource = await _resourceService.GetResourceAsync(id);
            return resource;
        }

        [HttpPost]
        public async Task<IActionResult> CreateResourceAsync([FromBody] ResourceDTO resourceDto)
        {
            await _resourceService.CreateResourceAsync(resourceDto);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateResourceAsync(int id, [FromBody] ResourceDTO resourceDto)
        {
            await _resourceService.UpdateResourceAsync(id, resourceDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResourceAsync(int id)
        {
            await _resourceService.DeleteResourceAsync(id);
            return Ok();
        }
    }
}
