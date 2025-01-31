namespace BankingSystem.Domain.Entities;

public class Account
{
    public Guid AccountId { get; private set; }

    public string OwnerId { get; private set; }

    public string OwnerName { get; private set; }

    public decimal Balance { get; private set; }

    public Account(Guid accountId, string ownerId, string ownerName, decimal initialBalance = 0m)
    {
        AccountId = accountId;
        OwnerId = ownerId;
        OwnerName = ownerName;
        Balance = initialBalance;
    }

    public void Deposit(decimal amount)
    {
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        Balance -= amount;
    }

    public void Transfer(decimal amount, Account destination)
    {
        this.Withdraw(amount);
        destination.Deposit(amount);
    }
}
