using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BankingSystem.Application.Commands.Accounts.Login;
using BankingSystem.Application.Commands.Accounts.Register;
using BankingSystem.Application.DTOs;
using BankingSystem.Application.DTOs.Responses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace BankingSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator, IConfiguration configuration)
    {
        _mediator = mediator;
        _configuration = configuration;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        var command = new RegisterUserCommand(
            model.Email,
            model.UserName,
            model.Password,
            model.OwnerName,
            model.InitialBalance
        );

        var result = await _mediator.Send(command);
        var token = await GenerateJwtTokenAsync(result.Email, result.UserId, result.UserName);

        return Ok(
            new AuthResponse
            {
                Token = token,
                AccountId = result.AccountId,
                Email = result.Email,
                Username = result.UserName,
            }
        );
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var loginCommand = new LoginUserCommand(model.Email, model.Password);
        var result = await _mediator.Send(loginCommand);

        var token = await GenerateJwtTokenAsync(result.Email, result.UserId, result.UserName);

        return Ok(
            new LoginResponse
            {
                Token = token,
                Email = result.Email,
                Username = result.UserName,
            }
        );
    }

    private Task<string> GenerateJwtTokenAsync(string email, string userId, string userName)
    {
        var sessionId = Guid.NewGuid().ToString();
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Name, userName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("SessionId", sessionId),
            new Claim("LoginTime", DateTime.UtcNow.ToString()),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["Jwt:ExpireHours"]));

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: expires,
            signingCredentials: credentials
        );

        return Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
    }
}
