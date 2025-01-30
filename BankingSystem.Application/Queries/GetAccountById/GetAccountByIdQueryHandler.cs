using AutoMapper;
using BankingSystem.Application.Contracts;
using BankingSystem.Application.DTOs;
using MediatR;

namespace BankingSystem.Application.Queries.GetAccountById
{
      public class GetAccountByIdQueryHandler
        : IRequestHandler<GetAccountByIdQuery, AccountDto>
      {
            private readonly IUnitOfWork _unitOfWork;
            private readonly IMapper _mapper;

            public GetAccountByIdQueryHandler(
                IUnitOfWork unitOfWork,
                IMapper mapper)
            {
                  _unitOfWork = unitOfWork;
                  _mapper = mapper;
            }

            public async Task<AccountDto> Handle(GetAccountByIdQuery request, CancellationToken cancellationToken)
            {
                  var account = await _unitOfWork.Accounts.GetByIdAsync(request.AccountId);
                  if (account == null)
                        throw new KeyNotFoundException("Account not found.");
                  return _mapper.Map<AccountDto>(account);
            }
      }
}