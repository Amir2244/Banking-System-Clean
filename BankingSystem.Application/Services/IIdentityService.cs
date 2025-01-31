namespace BankingSystem.Application.Services;

public interface IIdentityService
{
    Task<IdentityResult> CreateUserAsync(string email, string userName, string password);
    Task<IdentityResult> ValidateUserAsync(string email, string password);
    Task DeleteUserAsync(string userId);
}

public record IdentityResult
{
    public bool Succeeded { get; init; }
    public string UserId { get; init; }
    public string Email { get; init; }
    public string UserName { get; init; }
    public IEnumerable<IdentityError> Errors { get; init; }
}

public record IdentityError(string PropertyName, string Message);
