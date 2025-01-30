using BankingSystem.Application.Commands.Common;
using BankingSystem.Application.Contracts;
using BankingSystem.Application.Services;
using BankingSystem.Domain.Entities;
using BankingSystem.Domain.Enums;
using MediatR;
using System.Security;

namespace BankingSystem.Application.Commands.Withdraw;

public class WithdrawCommandHandler : TransactionalBaseRequestHandler<WithdrawCommand, Unit>
{
      public WithdrawCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService currentUserService) : base(unitOfWork, currentUserService)
      {
      }

      protected async override Task<Unit> Logic(WithdrawCommand request, CancellationToken cancellationToken)
      {
            var account = await _unitOfWork.Accounts.GetByIdAsync(request.AccountId);
            if (account == null)
                  throw new KeyNotFoundException("Account not found.");

            if (account.OwnerId != _currentUserService.UserId)
                  throw new SecurityException("You do not own this account.");

            // Domain logic
            account.Withdraw(request.Amount);
            await _unitOfWork.Accounts.UpdateAsync(account);

            // Record transaction
            var transaction = Transaction.CreateInstance(accountId: account.AccountId,
                  type: TransactionType.Withdrawal,
                  amount: request.Amount);
            await _unitOfWork.Transactions.AddAsync(transaction);

            return Unit.Value;
      }
}
