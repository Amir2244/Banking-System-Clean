using MediatR;

namespace BankingSystem.Application.Commands.Accounts.Login;

public record LoginUserCommand(string Email, string Password) : IRequest<LoginUserResult>;

public record LoginUserResult(
    string UserId,
    string Email,
    string UserName
);
