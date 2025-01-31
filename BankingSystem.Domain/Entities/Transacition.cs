using BankingSystem.Domain.Enums;

namespace BankingSystem.Domain.Entities
{
    public class Transaction
    {
        public Guid TransactionId { get; private set; }
        public Guid AccountId { get; private set; }
        public TransactionType Type { get; private set; }
        public decimal Amount { get; private set; }

        public DateTime OccurredOn { get; private set; }

        public Guid? DestinationAccountId { get; private set; }

        private Transaction(
            Guid accountId,
            TransactionType type,
            decimal amount,
            Guid? destinationAccountId = null
        )
        {
            TransactionId = Guid.NewGuid();
            AccountId = accountId;
            Type = type;
            Amount = amount;
            DestinationAccountId = destinationAccountId;
            OccurredOn = DateTime.UtcNow;
        }

        public static Transaction CreateInstance(
            Guid accountId,
            TransactionType type,
            decimal amount,
            Guid? destinationAccountId = null
        )
        {
            return new Transaction(accountId, type, amount, destinationAccountId);
        }
    }
}
