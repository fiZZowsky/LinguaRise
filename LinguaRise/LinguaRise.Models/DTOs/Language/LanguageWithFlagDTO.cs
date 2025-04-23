using Microsoft.AspNetCore.Http;

namespace LinguaRise.Models.DTOs;

public class LanguageWithFlagDTO
{
    public int Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string? FlagImage { get; set; }
}