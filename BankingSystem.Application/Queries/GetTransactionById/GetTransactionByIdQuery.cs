using BankingSystem.Application.DTOs;
using MediatR;

namespace BankingSystem.Application.Queries.GetTransactionById;
public record GetTransactionByIdQuery(Guid TransactionId) : IRequest<TransactionDto>;