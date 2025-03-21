using LinguaRise.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LinguaRise.DataAccess;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Course> Courses { get; set; }
    public DbSet<Language> Languages { get; set; }
    public DbSet<Lesson> Lessons { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<VocabularyCategory> VocabularyCategories { get; set; }
    public DbSet<Word> Words { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Relacja: Użytkownik 1:N Kursy
        modelBuilder.Entity<User>()
            .HasMany(u => u.Courses)
            .WithOne()
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacja: Kurs 1:N Lekcje
        modelBuilder.Entity<Course>()
            .HasMany(c => c.Lessons)
            .WithOne(l => l.Course)
            .HasForeignKey(l => l.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacja: Język 1:N Kategorii słownictwa
        modelBuilder.Entity<VocabularyCategory>()
            .HasOne<Language>()
            .WithMany(l => l.Categories)
            .HasForeignKey(vc => vc.Id)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacja: Lekcja N:M Słowa (Lekcja zawiera nauczone słowa)
        modelBuilder.Entity<Lesson>()
            .HasMany(l => l.LearnedWords)
            .WithMany();

        // Relacja: Język 1:N Słowa
        modelBuilder.Entity<Word>()
            .HasOne(w => w.Language)
            .WithMany()
            .HasForeignKey(w => w.LanguageId)
            .OnDelete(DeleteBehavior.Restrict);

        // Relacja: Kategoria 1:N Słowa
        modelBuilder.Entity<Word>()
            .HasOne(w => w.Category)
            .WithMany(c => c.Words)
            .HasForeignKey(w => w.VocabularyCategoryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}