using BankingSystem.Application.Contracts;
using BankingSystem.Application.Services;
using BankingSystem.Infrastructure.Contexts;
using BankingSystem.Infrastructure.Persistence;
using BankingSystem.Infrastructure.Profiles;
using BankingSystem.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BankingSystem.Infrastructure;

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection ConfigureInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
        );
        services.AddDbContext<IdentityAppDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("IdentityConnection"))
        );
        services.AddAutoMapper(typeof(InfrastructureMappingProfile));
        services.AddScoped<IAccountRepository, AccountRepository>();
        services.AddScoped<ITransactionRepository, TransactionRepository>();
        services.AddScoped<IIdentityService, IdentityService>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        return services;
    }
}
