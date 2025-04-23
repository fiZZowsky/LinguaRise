namespace LinguaRise.Models.DTOs;

public class LanguageDTO
{
    public int Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public byte[]? FlagImage { get; set; }
}