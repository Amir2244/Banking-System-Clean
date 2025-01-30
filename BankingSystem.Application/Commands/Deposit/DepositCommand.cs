namespace BankingSystem.Application.Commands.Deposit;

using MediatR;
using System;

public record DepositCommand(Guid AccountId, decimal Amount)
    : IRequest<Unit>;