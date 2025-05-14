using LinguaRise.Models.DTOs;

namespace LinguaRise.Services.Interfaces;

public interface ISpeechService
{
    Task<SpeechResponseDTO> SynthesizeAsync(int courseLanguageId);
}