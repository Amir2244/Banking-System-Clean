using MediatR;
namespace BankingSystem.Application.Commands.Accounts.Register;
public record RegisterUserCommand(
    string Email,
    string UserName,
    string Password,
    string OwnerName,
    decimal InitialBalance) : IRequest<RegisterUserResult>;

public record RegisterUserResult(
    Guid AccountId,
    string UserId,
    string Email,
    string UserName
);
