using MediatR;

namespace BankingSystem.Application.Commands.Accounts;

public record CreateAccountCommand(
        string OwnerId,
        string OwnerName,
        decimal InitialBalance
    ) : IRequest<Guid>;
