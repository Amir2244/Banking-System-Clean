using BankingSystem.Application.Contracts;
using BankingSystem.Application.Services;
using FluentValidation;

namespace BankingSystem.Application.Commands.Transfer;

public class TransferCommandValidator : AbstractValidator<TransferCommand>
{
      private readonly IUnitOfWork _unitOfWork;
      private readonly ICurrentUserService _currentUserService;

      public TransferCommandValidator(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
      {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;

            RuleFor(x => x.SourceAccountId)
                .NotEqual(Guid.Empty)
                .WithMessage("Source account is required")
                .MustAsync(async (id, cancellation) =>
                {
                      var account = await _unitOfWork.Accounts.GetByUserIdAsync(_currentUserService.UserId);
                      return account != null;
                })
                .WithMessage("Source account not found")
                .MustAsync(async (id, cancellation) =>
                {
                      var account = await _unitOfWork.Accounts.GetByIdAsync(id);
                      return account?.OwnerId == _currentUserService.UserId;
                })
                .WithMessage("You do not own the source account");

            RuleFor(x => x.DestinationAccountId)
                .NotEqual(Guid.Empty)
                .WithMessage("Destination account is required")
                .MustAsync(async (id, cancellation) =>
                {
                      var account = await _unitOfWork.Accounts.GetByIdAsync(id);
                      return account != null;
                })
                .WithMessage("Destination account not found");

            RuleFor(x => x.Amount)
                .GreaterThan(0)
                .WithMessage("Transfer amount must be greater than 0")
                .MustAsync(async (cmd, amount, cancellation) =>
                {
                      var sourceAccount = await _unitOfWork.Accounts.GetByIdAsync(cmd.SourceAccountId);
                      return sourceAccount?.Balance >= amount;
                })
                .WithMessage("Insufficient funds for transfer");

            RuleFor(x => x)
                .Must(x => x.SourceAccountId != x.DestinationAccountId)
                .WithMessage("Source and destination accounts cannot be the same");
      }
}
