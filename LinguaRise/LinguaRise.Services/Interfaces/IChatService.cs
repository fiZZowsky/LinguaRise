namespace LinguaRise.Services.Interfaces;

public interface IChatService
{
    Task<string> GetChatCompletionAsync(string userPrompt);
    Task<IEnumerable<string>> GetAvailableModelsAsync();
}