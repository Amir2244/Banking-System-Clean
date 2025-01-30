using BankingSystem.Application.DTOs;
using MediatR;

namespace BankingSystem.Application.Queries.GetTransactionsByAccountId
{
      public record GetTransactionsByAccountIdQuery(Guid AccountId)
        : IRequest<List<TransactionDto>>;
}
