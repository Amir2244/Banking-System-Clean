using BankingSystem.Application.Commands.Common;
using BankingSystem.Application.Contracts;
using BankingSystem.Application.Services;
using BankingSystem.Domain.Entities;
using BankingSystem.Domain.Enums;
using MediatR;

namespace BankingSystem.Application.Commands.Deposit;

public class DepositCommandHandler : TransactionalBaseRequestHandler<DepositCommand, Unit>
{
      public DepositCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
          : base(unitOfWork, currentUserService)
      {
      }

      protected override async Task<Unit> Logic(DepositCommand request, CancellationToken cancellationToken)
      {
            var account = await _unitOfWork.Accounts.GetByIdAsync(request.AccountId);
            account.Deposit(request.Amount);
            await _unitOfWork.Accounts.UpdateAsync(account);

            var transaction = Transaction.CreateInstance(accountId: account.AccountId,
                type: TransactionType.Deposit,
                amount: request.Amount);
            await _unitOfWork.Transactions.AddAsync(transaction);

            return Unit.Value;
      }
}