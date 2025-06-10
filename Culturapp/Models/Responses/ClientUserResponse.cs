namespace Culturapp.Models.Responses
{
  public class ClientUserResponse
  {
    public int Id { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? CPF { get; set; }
    public PhoneResponse? Phone { get; set; }
    public AddressResponse? Address { get; set; }
    public ICollection<EventResponse?>? Events { get; set; }
    public ICollection<CheckingResponse?>? Checkings { get; set; }
  }
}
