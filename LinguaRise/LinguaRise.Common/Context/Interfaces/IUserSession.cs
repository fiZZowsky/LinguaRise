namespace LinguaRise.Common.Context.Interfaces;
public interface IUserSession
{
    string LanguageCode { get; set; }
    Guid? UserId { get; set; }
}