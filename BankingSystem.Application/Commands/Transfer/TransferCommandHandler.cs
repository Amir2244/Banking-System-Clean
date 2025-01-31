using BankingSystem.Application.Commands.Common;
using BankingSystem.Application.Contracts;
using BankingSystem.Application.Services;
using BankingSystem.Domain.Entities;
using BankingSystem.Domain.Enums;
using MediatR;

namespace BankingSystem.Application.Commands.Transfer;

public class TransferCommandHandler : TransactionalBaseRequestHandler<TransferCommand, Unit>
{
    public TransferCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
        : base(unitOfWork, currentUserService) { }

    protected override async Task<Unit> Logic(
        TransferCommand request,
        CancellationToken cancellationToken
    )
    {
        var source = await _unitOfWork.Accounts.GetByIdAsync(request.SourceAccountId);
        var destination = await _unitOfWork.Accounts.GetByIdAsync(request.DestinationAccountId);

        source.Transfer(request.Amount, destination);
        await _unitOfWork.Accounts.UpdateAsync(source);
        await _unitOfWork.Accounts.UpdateAsync(destination);

        var transaction = Transaction.CreateInstance(
            accountId: source.AccountId,
            type: TransactionType.Transfer,
            amount: request.Amount,
            destinationAccountId: destination.AccountId
        );
        await _unitOfWork.Transactions.AddAsync(transaction);
        return Unit.Value;
    }
}
