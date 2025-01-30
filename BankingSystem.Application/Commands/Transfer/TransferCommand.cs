namespace BankingSystem.Application.Commands.Transfer;

using MediatR;
using System;

public record TransferCommand(
    Guid SourceAccountId,
    Guid DestinationAccountId,
    decimal Amount
) : IRequest<Unit>;