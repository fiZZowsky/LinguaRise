namespace LinguaRise.Common.Context.Interfaces;
public interface IUserContext
{
    string LanguageCode { get; set; }
    Guid? UserId { get; set; }

    void Setup(IUserSession session);
}