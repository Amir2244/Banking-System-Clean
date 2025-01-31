namespace BankingSystem.Application.DTOs.Responses;

public record LoginResponse
{
    public string Token { get; init; }
    public string Email { get; init; }
    public string Username { get; init; }
}
