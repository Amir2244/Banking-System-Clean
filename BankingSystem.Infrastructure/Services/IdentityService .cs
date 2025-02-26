﻿using BankingSystem.Application.Services;
using BankingSystem.Infrastructure.Contexts;
using Microsoft.AspNetCore.Identity;
using IdentityError = BankingSystem.Application.Services.IdentityError;
using IdentityResult = BankingSystem.Application.Services.IdentityResult;

namespace BankingSystem.Infrastructure.Services;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager
    )
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<IdentityResult> ValidateUserAsync(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return new IdentityResult
            {
                Succeeded = false,
                Errors = new[]
                {
                    new IdentityError("Email", "Invalid credentials: email not exists"),
                },
            };
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);

        return new IdentityResult
        {
            Succeeded = result.Succeeded,
            UserId = user.Id,
            Email = user.Email,
            UserName = user.UserName,
            Errors = result.Succeeded
                ? Array.Empty<IdentityError>()
                : new[] { new IdentityError("Password", "Invalid credentials") },
        };
    }

    public async Task<IdentityResult> CreateUserAsync(
        string email,
        string userName,
        string password
    )
    {
        var user = new ApplicationUser
        {
            Email = email,
            UserName = userName,
            SecurityStamp = Guid.NewGuid().ToString(),
        };

        var result = await _userManager.CreateAsync(user, password);

        return new IdentityResult
        {
            Succeeded = result.Succeeded,
            UserId = user.Id,
            Email = user.Email,
            UserName = user.UserName,
            Errors = result.Errors.Select(e => new IdentityError(
                GetPropertyNameFromCode(e.Code),
                e.Description
            )),
        };
    }

    private string GetPropertyNameFromCode(string code)
    {
        return code switch
        {
            "DuplicateUserName" => "UserName",
            "DuplicateEmail" => "Email",
            "InvalidEmail" => "Email",
            "PasswordTooShort" => "Password",
            "PasswordRequiresNonAlphanumeric" => "Password",
            "PasswordRequiresDigit" => "Password",
            "PasswordRequiresUpper" => "Password",
            _ => "User",
        };
    }

    public async Task DeleteUserAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user != null)
        {
            await _userManager.DeleteAsync(user);
        }
    }
}
