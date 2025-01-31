using BankingSystem.Application.DTOs;
using MediatR;

namespace BankingSystem.Application.Queries.GetAccountById
{
    public record GetAccountByIdQuery(Guid AccountId) : IRequest<AccountDto>;
}
