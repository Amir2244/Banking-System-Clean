using System.Security.Claims;
using BankingSystem.Application.Contracts;
using BankingSystem.Application.Services;
using Microsoft.AspNetCore.Http;

namespace BankingSystem.Infrastructure.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IUnitOfWork _unitOfWork;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork)
    {
        _httpContextAccessor = httpContextAccessor;
        _unitOfWork = unitOfWork;
    }

    public string? UserId =>
        _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

    public async Task<Guid?> AccountId()
    {
        var account = await _unitOfWork.Accounts.GetByUserIdAsync(UserId!);
        return account?.AccountId;
    }
}
