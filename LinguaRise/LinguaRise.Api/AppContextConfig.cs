using LinguaRise.Api.Middlewares;
using LinguaRise.Common;
using LinguaRise.Common.Context;
using LinguaRise.Common.Context.Interfaces;

namespace LinguaRise.Api
{
    public static class ApplicationConfiguration
    {
        public static IServiceCollection AddAppConfig(this IServiceCollection services)
        {
            services.AddScoped<IUserSession, UserSession>();
            services.AddScoped<IUserContext, UserContext>();
            services.AddScoped<RequestLocalizationMiddleware>();

            return services;
        }
    }
}
