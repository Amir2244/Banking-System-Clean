using BankingSystem.Application.Commands.Accounts;
using BankingSystem.Application.Commands.Accounts.Register;
using BankingSystem.Application.Exceptions;
using BankingSystem.Application.Services;
using MediatR;

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, RegisterUserResult>
{
    private readonly IIdentityService _identityService;
    private readonly IMediator _mediator;

    public RegisterUserCommandHandler(IIdentityService identityService, IMediator mediator)
    {
        _identityService = identityService;
        _mediator = mediator;
    }

    public async Task<RegisterUserResult> Handle(
        RegisterUserCommand request,
        CancellationToken cancellationToken
    )
    {
        IdentityResult userResult = null;

        try
        {
            userResult = await _identityService.CreateUserAsync(
                request.Email,
                request.UserName,
                request.Password
            );

            if (!userResult.Succeeded)
            {
                throw new ValidationException(
                    userResult
                        .Errors.Select(e => new ValidationError(e.PropertyName, e.Message))
                        .ToList()
                );
            }

            var accountId = await _mediator.Send(
                new CreateAccountCommand(
                    userResult.UserId,
                    request.OwnerName,
                    request.InitialBalance
                ),
                cancellationToken
            );

            return new RegisterUserResult(
                accountId,
                userResult.UserId,
                userResult.Email,
                userResult.UserName
            );
        }
        catch
        {
            if (userResult?.UserId != null)
            {
                await _identityService.DeleteUserAsync(userResult.UserId);
            }

            throw;
        }
    }
}
