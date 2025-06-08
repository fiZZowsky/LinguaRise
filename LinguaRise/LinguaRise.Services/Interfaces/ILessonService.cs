using LinguaRise.Models.DTOs;
using LinguaRise.Models.Entities;

namespace LinguaRise.Services.Interfaces
{
    public interface ILessonService
    {
        Task<IEnumerable<LessonDTO>> GetLessonsAsync();
        Task<LessonDTO> GetLessonAsync(int id);
        Task CreateLessonAsync(LessonDTO lesson);
        Task<SpeechResponseDTO> GetLessonContentSpeech(int categoryId, int languageId);
        Task<SoundRecognitionResult> WritingByEarLessonValidationAsync(RecognitionValidationRequest request);
        Task<PronunciationResultDTO> EvaluatePronunciationAsync(Stream audioStream, int wordId, int languageId, int lessonId);
        Task<LessonWritingContentDTO> GetWritingLessonContent(int languageId);
        Task<LessonSummaryDTO> GetLessonSummaryAsync(int lessonId, int categoryId);
    }
}
