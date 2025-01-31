using System.Reflection;
using BankingSystem.Application.Behaviors;
using BankingSystem.Application.Commands.Accounts;
using BankingSystem.Application.Commands.Deposit;
using BankingSystem.Application.Commands.Transfer;
using BankingSystem.Application.Commands.Withdraw;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BankingSystem.Application;

public static class ApplicationServicesRegistration
{
    public static IServiceCollection ConfigureApplicationServices(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(typeof(DepositCommandValidator).Assembly);
        services.AddValidatorsFromAssembly(typeof(TransferCommandValidator).Assembly);
        services.AddValidatorsFromAssembly(typeof(WithdrawCommandValidator).Assembly);
        services.AddValidatorsFromAssembly(typeof(CreateAccountCommandValidator).Assembly);
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
        });
        return services;
    }
}
