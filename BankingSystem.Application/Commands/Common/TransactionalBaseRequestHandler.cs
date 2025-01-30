using BankingSystem.Application.Contracts;
using BankingSystem.Application.Services;
using MediatR;

namespace BankingSystem.Application.Commands.Common;

public abstract class TransactionalBaseRequestHandler<TRequest, TResponse>
: IRequestHandler<TRequest, TResponse>
where TRequest : IRequest<TResponse>
{
      protected readonly IUnitOfWork _unitOfWork;
      protected readonly ICurrentUserService _currentUserService;

      public TransactionalBaseRequestHandler(IUnitOfWork unitOfWork,
            ICurrentUserService currentUserService)
      {
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
      }
      public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken)
      {
            await _unitOfWork.BeginTransactionAsync();
            try
            {
                  var result = await Logic(request, cancellationToken);
                  await _unitOfWork.CommitTransactionAsync();
                  return result;
            }
            catch (Exception ex)
            {
                  await _unitOfWork.RollbackTransactionAsync();
                  throw;
            }
      }
      protected abstract Task<TResponse> Logic(TRequest request, CancellationToken cancellationToken);

}

