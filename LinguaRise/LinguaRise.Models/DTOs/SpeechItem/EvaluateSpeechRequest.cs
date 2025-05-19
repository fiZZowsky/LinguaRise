using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.DTOs;

public class EvaluateSpeechRequest
{
    public IFormFile AudioFile { get; set; }
    public int WordId { get; set; }
    public int CourseId { get; set; }
    public int LessonId { get; set; }
}
