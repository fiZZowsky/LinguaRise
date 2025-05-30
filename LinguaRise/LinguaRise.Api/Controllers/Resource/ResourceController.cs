﻿using LinguaRise.Models.DTOs;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace LinguaRise.Api.Controllers.Resource
{
    [Authorize]
    [RequiredScope("API.Access")]
    [Route("api/resource")]
    [ApiController]
    public class ResourceController : ControllerBase
    {
        private readonly IResourceService _resourceService;

        public ResourceController(IResourceService resourceService)
        {
            _resourceService = resourceService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<ResourceDTO>> GetResourcesAsync([FromQuery] ResourceQuery query)
        {
            var resources = await _resourceService.GetResourcesAsync(query);
            return resources;
        }

        [HttpGet("{id}")]
        public async Task<ResourceDTO> GetResourceAsync(int id)
        {
            var resource = await _resourceService.GetResourceAsync(id);
            return resource;
        }

        //[AllowAnonymous]
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
