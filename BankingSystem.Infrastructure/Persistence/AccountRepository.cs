using AutoMapper;
using BankingSystem.Application.Contracts;
using BankingSystem.Domain.Entities;
using BankingSystem.Infrastructure.Contexts;
using BankingSystem.Infrastructure.DAOs;
using Microsoft.EntityFrameworkCore;

namespace BankingSystem.Infrastructure.Persistence;

public class AccountRepository : IAccountRepository
{
      private readonly AppDbContext _dbContext;
      private readonly IMapper _mapper;

      public AccountRepository(AppDbContext dbContext, IMapper mapper)
      {
            _dbContext = dbContext;
            _mapper = mapper;
      }

      public async Task<Account> GetByIdAsync(Guid accountId)
      {
            var accountDao = await _dbContext.Accounts.FirstOrDefaultAsync(e => e.AccountId == accountId);
            return _mapper.Map<Account>(accountDao);
      }

      public async Task AddAsync(Account account)
      {
            var accountDao = _mapper.Map<AccountDao>(account);
            await _dbContext.Accounts.AddAsync(accountDao);
            await _dbContext.SaveChangesAsync();
      }


      public async Task UpdateAsync(Account account)
      {
            var accountDao = _mapper.Map<AccountDao>(account);
            var existingAccount = await _dbContext.Accounts.FindAsync(accountDao.AccountId);

            if (existingAccount != null)
            {
                  _dbContext.Entry(existingAccount).CurrentValues.SetValues(accountDao);
            }

            await _dbContext.SaveChangesAsync();
      }


      public async Task<IEnumerable<Account>> GetAllAsync()
      {
            var accountDaos = await _dbContext.Accounts.ToListAsync();
            return _mapper.Map<IEnumerable<Account>>(accountDaos);
      }

      public async Task<Account?> GetByUserIdAsync(string userId)
      {
            var accountDao = await _dbContext.Accounts.FirstOrDefaultAsync(account => account.OwnerId == userId);
            return _mapper.Map<Account?>(accountDao);
      }
}