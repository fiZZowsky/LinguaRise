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

        public async Task<string> GetChatCompletionAsync(string prompt)
        {
            var payload = new
            {
                model = ModelId,
                prompt = prompt,
                max_tokens = 128,
                temperature = 0.7
            };

            var json = JsonSerializer.Serialize(payload);
            using var content = new StringContent(json, Encoding.UTF8, "application/json");
            var resp = await _http.PostAsync("completions", content);
            var body = await resp.Content.ReadAsStringAsync();

            if (!resp.IsSuccessStatusCode)
                throw new Exception($"GPT4All API error {(int)resp.StatusCode}: {body}");

            using var doc = JsonDocument.Parse(body);
            var text = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("text")
                .GetString();

            return text?.Trim() ?? throw new Exception("Brak treści odpowiedzi");
        }
    }
}