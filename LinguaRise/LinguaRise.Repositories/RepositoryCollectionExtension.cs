using LinguaRise.Repositories.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace LinguaRise.Repositories;

public static class RepositoryCollectionExtension
{
    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<ILanguageRepository, LanguageRepository>();
        services.AddScoped<ILessonRepository, LessonRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ICourseRepository, CourseRepository>();
        services.AddScoped<IWordRepository, WordRepository>();
        services.AddScoped<IResourceRepository, ResourceRepository>();
    }
}