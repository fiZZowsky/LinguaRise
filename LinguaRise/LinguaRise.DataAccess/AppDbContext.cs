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
    public DbSet<Resource> Resources { get; set; }

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

        // Relacja: Kurs N:1 Użytkownik
        modelBuilder.Entity<Course>()
            .HasOne(c => c.User)
            .WithMany(u => u.Courses)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacja: Kurs N:1 Język
        modelBuilder.Entity<Course>()
            .HasOne(c => c.Language)
            .WithMany()
            .HasForeignKey(c => c.LanguageId)
            .OnDelete(DeleteBehavior.Restrict);

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

        // Relacja: Kategoria 1:N Słowa
        modelBuilder.Entity<Word>()
            .HasOne(w => w.VocabularyCategory)
            .WithMany(c => c.Words)
            .HasForeignKey(w => w.VocabularyCategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacja: Resource N:1 Language
        modelBuilder.Entity<Resource>()
            .HasOne(r => r.Language)
            .WithMany()
            .HasForeignKey(r => r.LanguageId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}