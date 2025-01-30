namespace BankingSystem.Infrastructure.DAOs;

internal class AccountDao
{
      public Guid AccountId { get; set; }
      public string OwnerId { get; set; }
      public string OwnerName { get; set; }
      public decimal Balance { get; set; }

      protected AccountDao()
      {

      }
}
