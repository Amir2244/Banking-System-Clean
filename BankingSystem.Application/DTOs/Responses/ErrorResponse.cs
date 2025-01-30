namespace BankingSystem.Application.DTOs.Responses;
public record ErrorResponse
{
      public string Message { get; init; }
      public IEnumerable<string> Errors { get; init; }
}
