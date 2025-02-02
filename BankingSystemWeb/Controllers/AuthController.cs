using BankingSystem.Application.Commands.Accounts.Login;
using BankingSystem.Application.Commands.Accounts.Register;
using BankingSystem.Application.DTOs;
using BankingSystem.Application.DTOs.Responses;
using BankingSystem.Services.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankingSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IJwtService _jwtService;

    public AuthController(IMediator mediator, IJwtService jwtService)
    {
        _mediator = mediator;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        var result = await _mediator.Send(new RegisterUserCommand(
            model.Email,
            model.UserName,
            model.Password,
            model.OwnerName,
            model.InitialBalance
        ));

        var token = await _jwtService.GenerateTokenAsync(result.Email, result.UserId, result.UserName);

        return Ok(new AuthResponse
        {
            Token = token,
            AccountId = result.AccountId,
            Email = result.Email,
            Username = result.UserName,
        });
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var result = await _mediator.Send(new LoginUserCommand(model.Email, model.Password));
        var token = await _jwtService.GenerateTokenAsync(result.Email, result.UserId, result.UserName);

        return Ok(new LoginResponse
        {
            Token = token,
            Email = result.Email,
            Username = result.UserName,
        });
    }
}