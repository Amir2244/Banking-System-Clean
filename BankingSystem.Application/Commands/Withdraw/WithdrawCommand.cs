namespace BankingSystem.Application.Commands.Withdraw;

using MediatR;
using System;

public record WithdrawCommand(Guid AccountId, decimal Amount)
    : IRequest<Unit>;