﻿using System.ComponentModel.DataAnnotations;

namespace LinguaRise.Models.Entities;

public class VocabularyCategory
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;

    public ICollection<Word> Words { get; set; } = new List<Word>();
}