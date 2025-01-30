namespace BankingSystem.Application.Queries.GetAllAccounts;

using BankingSystem.Application.DTOs;
using MediatR;
using System.Collections.Generic;

public record GetAllAccountsQuery() : IRequest<List<AccountDto>>;