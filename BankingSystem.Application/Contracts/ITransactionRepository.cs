
using BankingSystem.Domain.Entities;


namespace BankingSystem.Application.Contracts
{
      public interface ITransactionRepository
      {
            Task AddAsync(Transaction transaction);
            Task<Transaction> GetByIdAsync(Guid transactionId);
            Task<List<Transaction>> GetByAccountIdAsync(Guid accountId);
            Task<List<Transaction>> GetAllAsync();
      }
}