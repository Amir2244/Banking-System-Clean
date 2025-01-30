using BankingSystem.Infrastructure.DAOs;
using Microsoft.EntityFrameworkCore;

namespace BankingSystem.Infrastructure.Contexts;

public class AppDbContext : DbContext
{
      public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
      {
      }

      internal DbSet<AccountDao> Accounts { get; set; }
      internal DbSet<TransactionDao> Transactions { get; set; }

      protected override void OnModelCreating(ModelBuilder modelBuilder)
      {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            modelBuilder.Entity<AccountDao>(entity =>
            {
                  entity.HasKey(e => e.AccountId);
                  entity.ToTable("Accounts");
            });

            modelBuilder.Entity<TransactionDao>(entity =>
            {
                  entity.HasKey(e => e.TransactionId);
                  entity.ToTable("Transactions");
            });
      }
}