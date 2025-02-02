namespace BankingSystem.Services.Auth;
public interface IJwtService
{
    Task<string> GenerateTokenAsync(string email, string userId, string userName);
}