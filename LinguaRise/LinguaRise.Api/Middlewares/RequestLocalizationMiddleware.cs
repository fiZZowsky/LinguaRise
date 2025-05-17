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
        var oidValue = context.User?.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;
        Guid userId = Guid.Empty;

        if (!string.IsNullOrEmpty(oidValue)
            && Guid.TryParse(oidValue, out var parsedOid))
        {
            userId = parsedOid;
        }

        var session = new UserSession
        {
            LanguageCode = language.ToUpper(),
            UserId = userId
        };

        userContext.Setup(session);

        await _next(context);
    }
}