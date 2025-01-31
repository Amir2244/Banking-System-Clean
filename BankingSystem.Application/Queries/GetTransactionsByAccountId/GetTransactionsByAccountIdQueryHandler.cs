using AutoMapper;
using BankingSystem.Application.Contracts;
using BankingSystem.Application.DTOs;
using MediatR;

namespace BankingSystem.Application.Queries.GetTransactionsByAccountId;

public class GetTransactionsByAccountIdQueryHandler
    : IRequestHandler<GetTransactionsByAccountIdQuery, List<TransactionDto>>
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IMapper _mapper;

    public GetTransactionsByAccountIdQueryHandler(
        ITransactionRepository transactionRepository,
        IMapper mapper
    )
    {
        _transactionRepository = transactionRepository;
        _mapper = mapper;
    }

    public async Task<List<TransactionDto>> Handle(
        GetTransactionsByAccountIdQuery request,
        CancellationToken cancellationToken
    )
    {
        var transactions = await _transactionRepository.GetByAccountIdAsync(request.AccountId);
        return _mapper.Map<List<TransactionDto>>(transactions);
    }
}
