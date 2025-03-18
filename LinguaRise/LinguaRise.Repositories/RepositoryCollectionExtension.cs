using Microsoft.Extensions.DependencyInjection;

namespace LinguaRise.Repositories;

public static class RepositoryCollectionExtension
{
    public static void AddRepositories(this IServiceCollection services)
    {
        // services.AddScoped<IUserRepository, UserRepository>(); // example
    }
}