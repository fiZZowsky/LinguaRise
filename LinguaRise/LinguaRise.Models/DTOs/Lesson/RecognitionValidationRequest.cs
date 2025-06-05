namespace LinguaRise.Models.DTOs
{
    public class RecognitionValidationRequest
    {
        public string RecognizedText { get; set; }
        public int LessonId { get; set; }
        public int WordId { get; set; }
        public int LanguageId { get; set; }
    }
}
