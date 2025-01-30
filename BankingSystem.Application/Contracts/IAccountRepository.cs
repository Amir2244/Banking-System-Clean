
using BankingSystem.Domain.Entities;

namespace BankingSystem.Application.Contracts
{
      public interface IAccountRepository
      {
            Task<Account> GetByIdAsync(Guid accountId);
            Task<Account?> GetByUserIdAsync(string userId);

            Task AddAsync(Account account);
            Task UpdateAsync(Account account);
            Task<IEnumerable<Account>> GetAllAsync();
      }
}