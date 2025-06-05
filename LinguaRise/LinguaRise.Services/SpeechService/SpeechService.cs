using LinguaRise.Common.Context.Interfaces;
using LinguaRise.Models.DTOs;
using LinguaRise.Repositories.Interfaces;
using LinguaRise.Services.Interfaces;
using Microsoft.CognitiveServices.Speech;
using Microsoft.Extensions.Configuration;
using LinguaRise.Models.Converters;
using LinguaRise.Models.Entities;
using Microsoft.CognitiveServices.Speech.Audio;
using Microsoft.CognitiveServices.Speech.PronunciationAssessment;
using System.Threading.Channels;

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

    public async Task<PronunciationResultDTO> EvaluatePronunciationAsync(Stream audioStream, Language language, int wordId)
    {
        var translatedSentence = await _wordRepository.GetTranslatedWord(wordId, language.Code);
        if (string.IsNullOrWhiteSpace(translatedSentence))
            throw new InvalidOperationException(
                $"No translation for wordId = {wordId}, language = {language.Code}");

        var speechConfig = SpeechConfig.FromSubscription(_speechConfig.SubscriptionKey, _speechConfig.Region);
        speechConfig.SpeechRecognitionLanguage = language.Culture;

        var audioFormat = AudioStreamFormat.GetWaveFormatPCM(16000, 16, 1);
        using var pushStream = AudioInputStream.CreatePushStream(audioFormat);
        using var audioConfig = AudioConfig.FromStreamInput(pushStream);

        var pronunciationConfig = new PronunciationAssessmentConfig(
            translatedSentence,
            GradingSystem.HundredMark,
            Granularity.Phoneme,
            enableMiscue: true);

        using var recognizer = new SpeechRecognizer(speechConfig, language.Culture, audioConfig);
        pronunciationConfig.ApplyTo(recognizer);

        var recognitionTask = recognizer.RecognizeOnceAsync();

        var buffer = new byte[4096];
        int bytesRead;
        while ((bytesRead = await audioStream.ReadAsync(buffer, 0, buffer.Length)) > 0)
        {
            pushStream.Write(buffer, bytesRead);
        }
        pushStream.Close();

        var speechResult = await recognitionTask;

        var resultDTO = new PronunciationResultDTO();
        if (speechResult.Reason == ResultReason.RecognizedSpeech)
        {
            var pronResult = PronunciationAssessmentResult.FromResult(speechResult);
            resultDTO.Score = pronResult.AccuracyScore;
            resultDTO.IsCorrect = resultDTO.Score >= 80.0;
            resultDTO.RecognizedText = speechResult.Text;
        }
        else if (speechResult.Reason == ResultReason.NoMatch)
        {
            resultDTO.Score = 0.0;
            resultDTO.IsCorrect = false;
            resultDTO.RecognizedText = string.Empty;
        }
        else if (speechResult.Reason == ResultReason.Canceled)
        {
            var cancel = CancellationDetails.FromResult(speechResult);
            throw new ApplicationException(
                $"Pronunciation assessment canceled: {cancel.Reason}, {cancel.ErrorDetails}");
        }
        else
        {
            throw new ApplicationException(
            $"Pronunciation unhandled reason: {speechResult.Reason}");
        }

        return resultDTO;
    }
}
