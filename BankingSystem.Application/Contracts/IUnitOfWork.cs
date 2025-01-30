namespace BankingSystem.Application.Contracts
{
      public interface IUnitOfWork
      {
            Task BeginTransactionAsync();
            Task RollbackTransactionAsync();
            Task CommitTransactionAsync();
            IAccountRepository Accounts { get; }
            ITransactionRepository Transactions { get; }
      }
}