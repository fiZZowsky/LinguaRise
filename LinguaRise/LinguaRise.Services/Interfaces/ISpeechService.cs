using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;

namespace LinguaRise.Services.Interfaces;

public interface ISpeechService
{
    Task<SpeechResponseDTO> SynthesizeAsync(int categoryId, int courseLanguageId);
    Task<PronunciationResultDTO> EvaluatePronounciationAsync(Stream audioStream, Language language, int wordId);
}