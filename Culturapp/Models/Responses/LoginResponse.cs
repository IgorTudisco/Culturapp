namespace Culturapp.Models.Responses
{
  public class LoginResponse
  {
    public string? Token { get; set; }
    public string? AccountType { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public int? UserId { get; set; }
  }
}