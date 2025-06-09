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
        services.AddScoped<ICourseService, CourseService>();
        services.AddScoped<IWordService, WordService>();
        services.AddScoped<IResourceService, ResourceService>();
        services.AddScoped<ISpeechService, SpeechService>();
        services.AddScoped<IVocabularyCategoryService, VocabularyCategoryService>();
        services.AddScoped<IChatService, ChatService>();
    }
}