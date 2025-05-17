using LinguaRise.Common.Context.Interfaces;

namespace LinguaRise.Common.Context;

public class UserSession : IUserSession
{
    public string LanguageCode {get; set; }
    public Guid? UserId { get; set; }
}