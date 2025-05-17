using LinguaRise.Models.DTOs;

namespace LinguaRise.Services.Interfaces
{
    public interface ILessonService
    {
        Task<IEnumerable<LessonDTO>> GetLessonsAsync();
        Task<LessonDTO> GetLessonAsync(int id);
        Task CreateLessonAsync(LessonDTO lesson);
        Task<SpeechResponseDTO> GetLessonContentSpeech(int categoryId, int languageId);
    }
}
