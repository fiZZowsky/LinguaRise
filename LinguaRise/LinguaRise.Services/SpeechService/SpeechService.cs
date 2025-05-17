using LinguaRise.Common.Context.Interfaces;
using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using Microsoft.CognitiveServices.Speech;
using Microsoft.Extensions.Configuration;
using LinguaRise.Models.Converters;
using LinguaRise.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LinguaRise.Services;

public class SpeechService : ISpeechService
{
    private readonly ILanguageRepository _languageRepository;
    private readonly IWordRepository _wordRepository;
    private readonly IUserContext _userContext;
    private readonly IResourceRepository _resourceRepository;
    private readonly SpeechConfig _speechConfig;

    public SpeechService(IConfiguration configuration, 
        ILanguageRepository languageRepository,
        IWordRepository wordRepository,
        IUserContext userContext,
        IResourceRepository resourceRepository)
    {
        _languageRepository = languageRepository;
        _wordRepository = wordRepository;
        _userContext = userContext;
        _resourceRepository = resourceRepository;

        var speechSection = configuration.GetSection("AzureSpeech");
        _speechConfig = SpeechConfig.FromSubscription(
            speechSection["Key"]!,
            speechSection["Region"]!);
    }

    public async Task<SpeechResponseDTO> SynthesizeAsync(int categoryId, int courseLanguageId)
    {
        var language = await _languageRepository.GetAsync(courseLanguageId);
        _speechConfig.SpeechSynthesisVoiceName = language.VoiceName;

        var wordsToLearn = await _wordRepository.GetWordsToLearn(_userContext.UserId.Value, categoryId, courseLanguageId);
        var wordsToLearnDTO = new List<WordToLearnDTO>();

        foreach (var word in wordsToLearn)
        {
            var translatedWord = await _resourceRepository.GetTranslatedWordAsync(word.ResourceKey, language.Code);
            wordsToLearnDTO.Add(word.ToWordToLearnDTO(translatedWord));
        }

        var items = new List<SpeechItemDTO>();
        using var synthesizer = new SpeechSynthesizer(_speechConfig, null);

        foreach (var text in wordsToLearnDTO)
        {
            var result = await synthesizer.SpeakTextAsync(text.Name);

            if (result.Reason != ResultReason.SynthesizingAudioCompleted)
            {
                var cancellation = SpeechSynthesisCancellationDetails.FromResult(result);
                throw new InvalidOperationException(
                    $"Synthesis error: {cancellation.Reason}. {cancellation.ErrorDetails}");
            }

            var base64 = Convert.ToBase64String(result.AudioData);
            items.Add(new SpeechItemDTO { TextId = text.Id, Text = text.Name, AudioBase64 = base64 });
        }

        return new SpeechResponseDTO { Items = items };
    }
}
