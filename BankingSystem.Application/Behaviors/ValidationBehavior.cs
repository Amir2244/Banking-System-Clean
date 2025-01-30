using BankingSystem.Application.Exceptions;
using FluentValidation;
using MediatR;
namespace BankingSystem.Application.Behaviors;
public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
      private readonly IEnumerable<IValidator<TRequest>> _validators;

      public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
      {
            _validators = validators;
      }

      public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next,
          CancellationToken cancellationToken)
      {
            if (_validators.Any())
            {
                  var context = new ValidationContext<TRequest>(request);
                  var validationResults =
                      await Task.WhenAll(_validators.Select(v => v.ValidateAsync(context, cancellationToken)));
                  var failures = validationResults
                      .SelectMany(r => r.Errors)
                      .Where(f => f != null)
                      .Select(x => new ValidationError(
                           x.PropertyName,
                           x.ErrorMessage
                            ))
                      .Distinct()
                      .ToList();

                  if (failures.Any())
                        throw new Exceptions.ValidationException(failures);
            }

            return await next();
      }
}