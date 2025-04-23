namespace LinguaRise.Models.DTOs;

public class ResourceDTO
{
    public int Id { get; set; }
    public string Key { get; set; }
    public string Name { get; set; }
    public int LanguageId { get; set; }
    public string? LanguageCode { get; set; }
    public string? LanguageName { get; set; }
    public string Type { get; set; }
}