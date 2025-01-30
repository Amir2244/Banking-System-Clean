using BankingSystem.Application.Contracts;
using BankingSystem.Infrastructure.Contexts;

namespace BankingSystem.Infrastructure.Persistence;
internal class UnitOfWork : IUnitOfWork
{
      private readonly AppDbContext _context;


      public UnitOfWork(AppDbContext context,
          ITransactionRepository transactionRepository,
          IAccountRepository accountRepository)
      {
            _context = context;
            Accounts = accountRepository;
            Transactions = transactionRepository;
      }

      public IAccountRepository Accounts { get; }


      public ITransactionRepository Transactions { get; }

      public async Task BeginTransactionAsync()
      {
            await _context.Database.BeginTransactionAsync();
      }

      public async Task CommitTransactionAsync()
      {
            await _context.Database.CommitTransactionAsync();
      }

      public async Task RollbackTransactionAsync()
      {
            await _context.Database.RollbackTransactionAsync();
      }
}
