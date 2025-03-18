using LinguaRise.Models;
using LinguaRise.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace LinguaRise.DataAccess;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var domainAssembly = Assembly.Load("LinguaRise.Models");
        var entityTypes = domainAssembly.GetTypes()
            .Where(t => t.Namespace == "LinguaRise.Models.Entities" &&
                        t.IsClass &&
                        !t.IsAbstract &&
                        t.GetCustomAttribute<DatabaseEntityAttribute>() != null);

        foreach (var entityType in entityTypes)
        {
            modelBuilder.Entity(entityType);
        }
    }

    public static void EnsureDatabaseUpdated(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        try
        {
            if (!context.Database.CanConnect())
            {
                context.Database.EnsureCreated();
            }

            context.Database.Migrate();
        }
        catch (Exception ex)
        {
            throw new Exception("Błąd podczas aktualizacji bazy danych: " + ex.Message);
        }
    }
}