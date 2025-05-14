using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using Microsoft.CognitiveServices.Speech;
using Microsoft.Extensions.Configuration;

namespace LinguaRise.Services;

public class SpeechService : ISpeechService
{
    private readonly ILanguageRepository _languageRepository;
    private readonly SpeechConfig _speechConfig;
    private readonly IReadOnlyDictionary<int, (string Culture, string Voice)> _voiceMap;

    public SpeechService(IConfiguration configuration, ILanguageRepository languageRepository)
    {
        _languageRepository = languageRepository;

        var speechSection = configuration.GetSection("AzureSpeech");
        _speechConfig = SpeechConfig.FromSubscription(
            speechSection["Key"]!,
            speechSection["Region"]!);
        
        _voiceMap = speechSection.GetSection("VoiceMap")
            .GetChildren()
            .ToDictionary(
                x => int.Parse(x.Key),
                x => (Culture: x["Culture"]!, Voice: x["Voice"]!)
            );
    }

    public async Task<SpeechResponseDTO> SynthesizeAsync(int courseLanguageId)
    {
        var language = await _languageRepository.GetAsync(courseLanguageId);

        _speechConfig.SpeechSynthesisVoiceName = language.VoiceName;

        // Przykładowe dane – docelowo pobierane z bazy
        var phrases = new[]
        {
            "Welcome to LinguaRise!",
            "This is an example sentence that will be read."
        };

        var items = new List<SpeechItemDTO>();
        using var synthesizer = new SpeechSynthesizer(_speechConfig, null);

        foreach (var text in phrases)
        {
            var result = await synthesizer.SpeakTextAsync(text);

            if (result.Reason != ResultReason.SynthesizingAudioCompleted)
            {
                var cancellation = SpeechSynthesisCancellationDetails.FromResult(result);
                throw new InvalidOperationException(
                    $"Synthesis error: {cancellation.Reason}. {cancellation.ErrorDetails}");
            }

            var base64 = Convert.ToBase64String(result.AudioData);
            items.Add(new SpeechItemDTO { Text = text, AudioBase64 = base64 });
        }

        return new SpeechResponseDTO { Items = items };
    }
}
