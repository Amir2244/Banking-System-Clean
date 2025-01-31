using BankingSystem.Application.Commands.Deposit;
using BankingSystem.Application.Commands.Transfer;
using BankingSystem.Application.Commands.Withdraw;
using BankingSystem.Application.DTOs;
using BankingSystem.Application.Queries.GetTransactionsByAccountId;
using BankingSystem.Application.Queries.GetUserAccount;
using BankingSystem.Application.Services;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankingSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class AccountsController : ControllerBase
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IMediator _mediator;

    public AccountsController(IMediator mediator, ICurrentUserService currentUserService)
    {
        _mediator = mediator;
        _currentUserService = currentUserService;
    }

    [HttpPost("deposit")]
    public async Task<IActionResult> Deposit([FromBody] CreateDepositTransactionRequest dto)
    {
        var sourceAccountId = await _currentUserService.AccountId();
        var command = new DepositCommand(sourceAccountId.Value, dto.Amount);
        await _mediator.Send(command);
        return Ok(new { Message = "Deposit successful" });
    }

    [HttpPost("withdraw")]
    public async Task<IActionResult> Withdraw([FromBody] CreateWithdrawTransactionRequest dto)
    {
        var sourceAccountId = await _currentUserService.AccountId();
        await _mediator.Send(new WithdrawCommand(sourceAccountId.Value, dto.Amount));
        return Ok(new { Message = "Withdrawal successful" });
    }

    [HttpPost("transfer")]
    public async Task<IActionResult> Transfer([FromBody] CreateTransferTransactionRequest dto)
    {
        var sourceAccountId = await _currentUserService.AccountId();
        await _mediator.Send(
            new TransferCommand(sourceAccountId.Value, dto.DestinationAccountId, dto.Amount)
        );
        return Ok(new { Message = "Transfer successful" });
    }

    [HttpGet("mine")]
    public async Task<ActionResult<AccountDto>> GetMyAccount()
    {
        var account = await _mediator.Send(new GetUserAccountsQuery());
        return Ok(account);
    }

    [HttpGet("transactions")]
    public async Task<ActionResult<List<TransactionDto>>> GetTransactions()
    {
        var accountId = await _currentUserService.AccountId();
        var transactions = await _mediator.Send(new GetTransactionsByAccountIdQuery((Guid)accountId!));
        return Ok(transactions);
    }
}