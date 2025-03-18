using Microsoft.Extensions.DependencyInjection;

namespace LinguaRise.Services;

public static class ServiceCollectionExtension
{
    public static void AddService(this IServiceCollection services)
    {
        // services.AddScoped<IUserService, UserService>(); // example
    }
}