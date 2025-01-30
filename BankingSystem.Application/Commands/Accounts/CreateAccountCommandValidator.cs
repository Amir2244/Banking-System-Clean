
using FluentValidation;

namespace BankingSystem.Application.Commands.Accounts;

      public class CreateAccountCommandValidator : AbstractValidator<CreateAccountCommand>
      {
            public CreateAccountCommandValidator()
            {
                  RuleFor(x => x.OwnerId).NotEmpty().WithMessage("OwnerId is required.");
                  RuleFor(x => x.OwnerName).NotEmpty().WithMessage("OwnerName cannot be empty.");
                  RuleFor(x => x.InitialBalance).GreaterThanOrEqualTo(0)
                      .WithMessage("Initial balance cannot be negative.");
            }
      }

