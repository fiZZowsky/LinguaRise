using LinguaRise.Models.DTOs;

namespace LinguaRise.Services.Interfaces
{
    public interface ILessonService
    {
        public Task<IEnumerable<LessonDTO>> GetLessonsAsync();
        public Task<LessonDTO> GetLessonAsync(int id);
        public Task<LessonDTO> CreateLessonAsync(LessonDTO lesson);
    }
}
