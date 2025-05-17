using LinguaRise.Common.Context.Interfaces;

namespace LinguaRise.Common;

public class UserContext : IUserContext
{
    public string? LanguageCode { get; set; }
    public Guid? UserId { get; set; }

    public void Setup(IUserSession session)
    {
        LanguageCode = session.LanguageCode;
        UserId = session.UserId;
    }
}