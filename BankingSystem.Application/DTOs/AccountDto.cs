namespace BankingSystem.Application.DTOs
{
    public class AccountDto
    {
        public Guid AccountId { get; set; }
        public string OwnerName { get; set; }
        public decimal Balance { get; set; }
    }
}
