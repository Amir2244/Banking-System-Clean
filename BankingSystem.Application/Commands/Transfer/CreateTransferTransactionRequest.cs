namespace BankingSystem.Application.Commands.Transfer;

public class CreateTransferTransactionRequest
{
    public Guid DestinationAccountId { get; set; }
    public decimal Amount { get; set; }
}
