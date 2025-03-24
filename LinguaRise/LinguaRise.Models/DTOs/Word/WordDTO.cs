namespace LinguaRise.Models.DTOs;

public class WordDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Level { get; set; }
    public int LanguageId { get; set; }
    public string LanguageCode { get; set; }
    public int VocabularyCategoryId { get; set; }
    public string VocabularyCategoryName { get; set; }
}