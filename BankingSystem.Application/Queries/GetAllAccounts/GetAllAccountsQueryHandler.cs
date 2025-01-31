using BankingSystem.Application.Contracts;
using BankingSystem.Application.DTOs;

namespace BankingSystem.Application.Queries.GetAllAccounts;

using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;

public class GetAllAccountsQueryHandler : IRequestHandler<GetAllAccountsQuery, List<AccountDto>>
{
    private readonly IAccountRepository _accountRepository;
    private readonly IMapper _mapper;

    public GetAllAccountsQueryHandler(IAccountRepository accountRepository, IMapper mapper)
    {
        _accountRepository = accountRepository;
        _mapper = mapper;
    }

    public async Task<List<AccountDto>> Handle(
        GetAllAccountsQuery request,
        CancellationToken cancellationToken
    )
    {
        // This method would need to exist on your IAccountRepository:
        var accounts = await _accountRepository.GetAllAsync();

        return _mapper.Map<List<AccountDto>>(accounts);
    }
}
