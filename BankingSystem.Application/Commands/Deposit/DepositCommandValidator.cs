using BankingSystem.Application.Contracts;
using BankingSystem.Application.Services;
using FluentValidation;

namespace BankingSystem.Application.Commands.Deposit;

public class DepositCommandValidator : AbstractValidator<DepositCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public DepositCommandValidator(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;

        RuleFor(x => x.AccountId)
            .NotEqual(Guid.Empty)
            .WithMessage("Account ID is required")
            .MustAsync(
                async (id, cancellation) =>
                {
                    var account = await _unitOfWork.Accounts.GetByIdAsync(id);
                    return account != null;
                }
            )
            .WithMessage("Account not found")
            .MustAsync(
                async (id, cancellation) =>
                {
                    var account = await _unitOfWork.Accounts.GetByIdAsync(id);
                    return account?.OwnerId == _currentUserService.UserId;
                }
            )
            .WithMessage("You do not own this account");

        RuleFor(x => x.Amount).GreaterThan(0).WithMessage("Deposit amount must be greater than 0");
    }
}
