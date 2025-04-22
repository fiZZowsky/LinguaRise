using System.Globalization;
using LinguaRise.Common.Context;
using LinguaRise.Common.Context.Interfaces;

namespace LinguaRise.Api.Middlewares;
public class RequestLocalizationMiddleware
{
    private readonly IUserContext _userContext;

    public RequestLocalizationMiddleware(IUserContext userContext)
    {
        _userContext = userContext;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var language = context.Request.Headers["Accept-Language"].FirstOrDefault() ?? "en";

        var session = new UserSession
        {
            LanguageCode = GetLanguageCode()
        };

        _userContext.Setup(session);

        await next(context);
    }

    private string GetLanguageCode()
    {
        return CultureInfo.CurrentCulture.TwoLetterISOLanguageName.ToUpper();
    }
}