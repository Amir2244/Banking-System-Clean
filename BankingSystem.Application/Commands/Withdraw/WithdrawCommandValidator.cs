using BankingSystem.Application.Contracts;
using BankingSystem.Application.Services;
using FluentValidation;

namespace BankingSystem.Application.Commands.Withdraw;

public class WithdrawCommandValidator : AbstractValidator<WithdrawCommand>
{
      private readonly IUnitOfWork _unitOfWork;
      private readonly ICurrentUserService _currentUserService;

      public WithdrawCommandValidator(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
      {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;

            RuleFor(x => x.AccountId)
                .NotEqual(Guid.Empty)
                .WithMessage("Account ID is required")
                .MustAsync(async (accountId, cancellation) =>
                {
                      var account = await _unitOfWork.Accounts.GetByIdAsync(accountId);
                      return account != null && account.OwnerId == _currentUserService.UserId;
                })
                .WithMessage("Account not found or you don't have permission");

            RuleFor(x => x.Amount)
                .GreaterThan(0)
                .WithMessage("Withdrawal amount must be greater than 0")
                .MustAsync(async (cmd, amount, cancellation) =>
                {
                      var account = await _unitOfWork.Accounts.GetByIdAsync(cmd.AccountId);
                      return account?.Balance >= amount;
                })
                .WithMessage("Insufficient funds for withdrawal");
      }
}