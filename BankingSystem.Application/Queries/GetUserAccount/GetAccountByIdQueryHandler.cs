using AutoMapper;
using BankingSystem.Application.Contracts;
using BankingSystem.Application.DTOs;
using BankingSystem.Application.Queries.GetUserAccount;
using BankingSystem.Application.Services;
using MediatR;

namespace BankingSystem.Application.Queries.getUserAccount;

public class GetUserAccountsQueryHandler
    : IRequestHandler<GetUserAccountsQuery, AccountDto>
{
      private readonly IUnitOfWork _unitOfWork;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUserService;

      public GetUserAccountsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
      {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserService = currentUserService;
      }

      public async Task<AccountDto> Handle(GetUserAccountsQuery request, CancellationToken cancellationToken)
      {
            var account = await _unitOfWork.Accounts.GetByUserIdAsync(_currentUserService.UserId);
            if (account is null)
                  throw new KeyNotFoundException("Account not found.");
            return _mapper.Map<AccountDto>(account);
      }
}