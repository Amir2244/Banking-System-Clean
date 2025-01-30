using BankingSystem.Application.DTOs;
using MediatR;

namespace BankingSystem.Application.Queries.GetUserAccount;

public record GetUserAccountsQuery() : IRequest<AccountDto>;