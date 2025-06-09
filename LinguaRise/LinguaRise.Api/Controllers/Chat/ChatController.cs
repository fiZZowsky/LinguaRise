// ChatController.cs
using Microsoft.AspNetCore.Mvc;
using LinguaRise.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Web.Resource;

namespace LinguaRise.Api.Controllers.Chat
{
    
    // [Authorize]
    // [RequiredScope("API.Access")]
    [ApiController]
    [Route("api/chat")]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }

        public class ChatRequest
        {
            public string Prompt { get; set; }
        }

        public class ChatResponse
        {
            public string Response { get; set; }
        }

        [HttpPost("ask")]
        public async Task<IActionResult> Ask([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Prompt))
                return BadRequest("Prompt nie może być pusty.");

            // Tu używamy nowej metody
            Console.WriteLine(request.Prompt);
            string answer = await _chatService.GetChatCompletionAsync(request.Prompt);
            return Ok(new ChatResponse { Response = answer });
        }
        
        [HttpGet("models")]
        public async Task<IActionResult> Models()
        {
            IEnumerable<string> models = await _chatService.GetAvailableModelsAsync();
            return Ok(models);
        }
    }
}