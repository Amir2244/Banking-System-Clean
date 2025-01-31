namespace BankingSystem.Application.DTOs;

public class RegisterDto
{
    public string Email { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }

    // Domain account info
    public string OwnerName { get; set; }
    public decimal InitialBalance { get; set; }
}
