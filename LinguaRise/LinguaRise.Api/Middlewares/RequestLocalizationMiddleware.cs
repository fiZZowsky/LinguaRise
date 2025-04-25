using System.Globalization;
using LinguaRise.Common.Context;
using LinguaRise.Common.Context.Interfaces;

namespace LinguaRise.Api.Middlewares;
public class RequestLocalizationMiddleware
{
    private readonly RequestDelegate _next;

    public RequestLocalizationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var userContext = context.RequestServices.GetRequiredService<IUserContext>();

        var language = context.Request.Headers["Accept-Language"].FirstOrDefault() ?? "EN";

        var session = new UserSession
        {
            LanguageCode = language.ToUpper()
        };

        userContext.Setup(session);

        await _next(context);
    }
}