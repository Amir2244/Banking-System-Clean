using AutoMapper;
using BankingSystem.Application.Contracts;
using BankingSystem.Application.DTOs;
using MediatR;


namespace BankingSystem.Application.Queries.GetTransactionById
{
      public class GetTransactionByIdQueryHandler
        : IRequestHandler<GetTransactionByIdQuery, TransactionDto>
      {
            private readonly ITransactionRepository _transactionRepository;
            private readonly IMapper _mapper;

            public GetTransactionByIdQueryHandler(
                ITransactionRepository transactionRepository,
                IMapper mapper)
            {
                  _transactionRepository = transactionRepository;
                  _mapper = mapper;
            }

            public async Task<TransactionDto> Handle(GetTransactionByIdQuery request, CancellationToken cancellationToken)
            {
                  var transaction = await _transactionRepository.GetByIdAsync(request.TransactionId);
                  if (transaction == null)
                        throw new KeyNotFoundException("Transaction not found.");

                  return _mapper.Map<TransactionDto>(transaction);
            }
      }
}