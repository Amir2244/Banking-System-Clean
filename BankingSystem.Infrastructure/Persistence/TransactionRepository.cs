using AutoMapper;
using BankingSystem.Application.Contracts;
using BankingSystem.Domain.Entities;
using BankingSystem.Infrastructure.Contexts;
using BankingSystem.Infrastructure.DAOs;
using Microsoft.EntityFrameworkCore;

namespace BankingSystem.Infrastructure.Persistence;

public class TransactionRepository : ITransactionRepository
{
    private readonly AppDbContext _dbContext;
    private readonly IMapper _mapper;

    public TransactionRepository(AppDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task AddAsync(Transaction transaction)
    {
        var transactionDao = _mapper.Map<TransactionDao>(transaction);
        await _dbContext.Transactions.AddAsync(transactionDao);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<Transaction> GetByIdAsync(Guid transactionId)
    {
        var transactionDao = await _dbContext.Transactions.FirstOrDefaultAsync(t =>
            t.TransactionId == transactionId
        );
        return _mapper.Map<Transaction>(transactionDao);
    }

    public async Task<List<Transaction>> GetByAccountIdAsync(Guid accountId)
    {
        var transactionDaos = await _dbContext
            .Transactions.Where(t =>
                t.AccountId == accountId || t.DestinationAccountId == accountId
            )
            .OrderByDescending(t => t.OccurredOn)
            .ToListAsync();
        return _mapper.Map<List<Transaction>>(transactionDaos);
    }

    public async Task<List<Transaction>> GetAllAsync()
    {
        var transactionDaos = await _dbContext
            .Transactions.OrderByDescending(t => t.OccurredOn)
            .ToListAsync();
        return _mapper.Map<List<Transaction>>(transactionDaos);
    }
}
