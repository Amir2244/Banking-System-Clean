
using AutoMapper;
using BankingSystem.Application.Contracts;
using BankingSystem.Application.DTOs;
using MediatR;


namespace BankingSystem.Application.Queries.GetAllTransactions
{
      public class GetAllTransactionsQueryHandler
        : IRequestHandler<GetAllTransactionsQuery, List<TransactionDto>>
      {
            private readonly ITransactionRepository _transactionRepository;
            private readonly IMapper _mapper;

            public GetAllTransactionsQueryHandler(
                ITransactionRepository transactionRepository,
                IMapper mapper)
            {
                  _transactionRepository = transactionRepository;
                  _mapper = mapper;
            }

            public async Task<List<TransactionDto>> Handle(GetAllTransactionsQuery request, CancellationToken cancellationToken)
            {
                  var transactions = await _transactionRepository.GetAllAsync();
                  return _mapper.Map<List<TransactionDto>>(transactions);
            }
      }
}
