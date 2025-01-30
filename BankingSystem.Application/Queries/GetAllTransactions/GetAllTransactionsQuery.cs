using BankingSystem.Application.DTOs;
using MediatR;

namespace BankingSystem.Application.Queries.GetAllTransactions
{
      public record GetAllTransactionsQuery : IRequest<List<TransactionDto>>;
}