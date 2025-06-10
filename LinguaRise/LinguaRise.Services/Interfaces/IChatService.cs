namespace LinguaRise.Services.Interfaces;

public interface IChatService
{
    Task<string> GetChatCompletionAsync(string userPrompt, int languageId, string languageCode);
    Task<IEnumerable<string>> GetAvailableModelsAsync();
}