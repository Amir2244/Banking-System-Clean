using BankingSystem.Application.Contracts;
using BankingSystem.Domain.Entities;
using MediatR;

namespace BankingSystem.Application.Commands.Accounts;

public class CreateAccountCommandHandler : IRequestHandler<CreateAccountCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;

    public CreateAccountCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Guid> Handle(
        CreateAccountCommand request,
        CancellationToken cancellationToken
    )
    {
        var accountId = Guid.NewGuid();

        // Create domain entity (constructor enforces domain rules)
        var account = new Account(
            accountId: accountId,
            ownerId: request.OwnerId,
            ownerName: request.OwnerName,
            initialBalance: request.InitialBalance
        );

        // Persist in repository
        await _unitOfWork.Accounts.AddAsync(account);

        return accountId;
    }
}
