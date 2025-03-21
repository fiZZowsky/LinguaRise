namespace LinguaRise.Common.Exceptions;

public class NotFoundException : Exception
{
    public int ErrorCode { get; }

    public NotFoundException(string message, int errorCode = 500) : base(message)
    {
        ErrorCode = errorCode;
    }
}