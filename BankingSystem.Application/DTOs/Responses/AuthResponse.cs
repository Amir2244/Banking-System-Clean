namespace BankingSystem.Application.DTOs.Responses;

public record AuthResponse
{
    public string Token { get; init; }
    public Guid AccountId { get; init; }
    public string Email { get; init; }
    public string Username { get; init; }
}
