using BankingSystem.Domain.Enums;

namespace BankingSystem.Infrastructure.DAOs;

internal class TransactionDao
{
    public Guid TransactionId { get; set; }
    public Guid AccountId { get; set; }
    public TransactionType Type { get; set; }
    public decimal Amount { get; set; }
    public DateTime OccurredOn { get; set; }

    public Guid? DestinationAccountId { get; set; }

    protected TransactionDao() { }
}
