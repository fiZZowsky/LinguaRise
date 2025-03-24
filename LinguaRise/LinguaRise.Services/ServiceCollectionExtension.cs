using LinguaRise.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace LinguaRise.Services;

public static class ServiceCollectionExtension
{
    public static void AddService(this IServiceCollection services)
    {
        services.AddScoped<ILanguageService, LanguageService>();
        services.AddScoped<ILessonService, LessonService>();
        services.AddScoped<IUserService, UserService>();
    }
}