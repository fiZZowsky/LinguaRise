// ChatService.cs
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using LinguaRise.Services.Interfaces;

namespace LinguaRise.Services
{
    public class ChatService : IChatService
    {
        private readonly HttpClient _http;
        private const string ModelId = "LIama 3.2 3B Instruct";
        private static readonly Dictionary<int, string> Languages = new()
        {
            [1] = "English",
            [2] = "Spanish",
            [3] = "Polish"
        };
        private static readonly Dictionary<string, string> LanguageNames = new()
        {
            ["EN"] = "English",
            ["ES"] = "Spanish",
            ["PL"] = "Polish"
        };

        public ChatService()
        {
            _http = new HttpClient
            {
                BaseAddress = new Uri("http://localhost:4891/v1/")
            };
        }
        
        public async Task<IEnumerable<string>> GetAvailableModelsAsync()
        {
            var resp = await _http.GetAsync("models");
            resp.EnsureSuccessStatusCode();
            using var doc = JsonDocument.Parse(await resp.Content.ReadAsStringAsync());
            var list = new List<string>();
            foreach (var m in doc.RootElement.GetProperty("models").EnumerateArray())
            {
                if (m.TryGetProperty("id", out var id))
                    list.Add(id.GetString()!);
            }
            return list;
        }

        public async Task<string> GetChatCompletionAsync(string prompt, int languageId, string languageCode)
        {
            Languages.TryGetValue(languageId, out var studLangName);
            LanguageNames.TryGetValue(languageCode.ToUpper(), out var langName);
            
            var predefinePrompt = $@"
            You are a {studLangName} language assistant and expert.
            Whenever the user asks you something, answer that exact question in **{langName}**,
            and include a brief explanation in {langName} of your answer.
            Do not add anything else—focus only on the user's request.";
            
            var fullPrompt = $"{predefinePrompt.Trim()}\n\n{prompt}";
            
            var payload = new
            {
                model = ModelId,
                prompt = fullPrompt,
                max_tokens = 256,
                temperature = 0.3
            };

            var json = JsonSerializer.Serialize(payload);
            using var content = new StringContent(json, Encoding.UTF8, "application/json");
            var resp = await _http.PostAsync("completions", content);
            var body = await resp.Content.ReadAsStringAsync();

            if (!resp.IsSuccessStatusCode)
                throw new Exception($"LLM API error {(int)resp.StatusCode}: {body}");

            using var doc = JsonDocument.Parse(body);
            var text = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("text")
                .GetString();
            return text?.Trim() ?? throw new Exception("Brak treści odpowiedzi");
        }
    }
}