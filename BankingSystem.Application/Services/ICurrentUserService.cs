namespace BankingSystem.Application.Services;

public interface ICurrentUserService
{
    string? UserId { get; }
    Task<Guid?> AccountId();
}
