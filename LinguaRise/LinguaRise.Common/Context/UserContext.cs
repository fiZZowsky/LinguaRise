using LinguaRise.Common.Context.Interfaces;

namespace LinguaRise.Common;

public class UserContext : IUserContext
{
    public string? LanguageCode { get; set; }

    public void Setup(IUserSession session)
    {
        LanguageCode = session.LanguageCode;
    }
}