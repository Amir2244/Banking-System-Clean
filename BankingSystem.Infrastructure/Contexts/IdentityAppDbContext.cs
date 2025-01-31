using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BankingSystem.Infrastructure.Contexts;

public class IdentityAppDbContext : IdentityDbContext<ApplicationUser>
{
    public IdentityAppDbContext(DbContextOptions<IdentityAppDbContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(IdentityAppDbContext).Assembly);
    }
}
