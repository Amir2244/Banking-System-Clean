using BankingSystem.Application.Exceptions;
using BankingSystem.Application.Services;
using MediatR;

namespace BankingSystem.Application.Commands.Accounts.Login;

public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, LoginUserResult>
{
      private readonly IIdentityService _identityService;

      public LoginUserCommandHandler(IIdentityService identityService)
      {
            _identityService = identityService;
      }

      public async Task<LoginUserResult> Handle(LoginUserCommand request, CancellationToken cancellationToken)
      {
            var result = await _identityService.ValidateUserAsync(request.Email, request.Password);

            if (!result.Succeeded)
            {
                  throw new ValidationException(
                      result.Errors.Select(e => new ValidationError("Login", e.Message)).ToList()
                  );
            }

            return new LoginUserResult(
                result.UserId,
                result.Email,
                result.UserName
            );
      }
}
