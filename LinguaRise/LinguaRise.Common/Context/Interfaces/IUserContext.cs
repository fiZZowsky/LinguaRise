namespace LinguaRise.Common.Context.Interfaces;
public interface IUserContext
{
    string LanguageCode { get; set; }

    void Setup(IUserSession session);
}