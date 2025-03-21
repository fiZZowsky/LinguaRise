using LinguaRise.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LinguaRise.DataAccess;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Language> Languages { get; set; }
    public DbSet<Translation> Translations { get; set; }
    public DbSet<VocabularyCategory> VocabularyCategories { get; set; }
    public DbSet<Word> Words { get; set; }
    public DbSet<Course> Courses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Relacja Course -> Language (jeden kurs dotyczy jednego języka)
        modelBuilder.Entity<Course>()
            .HasOne(c => c.Language)
            .WithMany(l => l.Courses)
            .HasForeignKey(c => c.LanguageId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacja Course -> Words (wiele słów może należeć do wielu kursów)
        modelBuilder.Entity<Course>()
            .HasMany(c => c.Words)
            .WithMany(w => w.Courses)
            .UsingEntity<Dictionary<string, object>>(
                "CourseWords",
                j => j.HasOne<Word>().WithMany().HasForeignKey("WordsId").OnDelete(DeleteBehavior.Restrict),
                j => j.HasOne<Course>().WithMany().HasForeignKey("CourseId").OnDelete(DeleteBehavior.Restrict)
            );

        // Relacja Word -> Language (jedno słowo należy do jednego języka)
        modelBuilder.Entity<Word>()
            .HasOne(w => w.Language)
            .WithMany(l => l.Words)
            .HasForeignKey(w => w.LanguageId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacja Word -> VocabularyCategory (jedno słowo ma jedną kategorię)
        modelBuilder.Entity<Word>()
            .HasOne(w => w.VocabularyCategory)
            .WithMany(vc => vc.Words)
            .HasForeignKey(w => w.VocabularyCategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacja Translation -> Word (jedno tłumaczenie dotyczy jednego słowa)
        modelBuilder.Entity<Translation>()
            .HasOne(t => t.Word)
            .WithMany(w => w.Translations)
            .HasForeignKey(t => t.WordId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacja Translation -> Language (tłumaczenie jest w jednym języku)
        modelBuilder.Entity<Translation>()
            .HasOne(t => t.Language)
            .WithMany(l => l.Translations)
            .HasForeignKey(t => t.LanguageId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}