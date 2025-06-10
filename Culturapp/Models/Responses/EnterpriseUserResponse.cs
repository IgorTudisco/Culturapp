namespace Culturapp.Models.Responses
{
  public class EnterpriseUserResponse
  {
    public int Id { get; set; }
    public string? UserName { get; set; } // this is the fantasy name of the enterprise
    public string? FullName { get; set; } // this is the name of the enterprise
    public string? CNPJ { get; set; }
    public string? Email { get; set; }
    public ICollection<EventResponse?>? Events { get; set; }
    public ICollection<PhoneResponse?>? Phones { get; set; }
    public int? AddressId { get; set; }
    public AddressResponse? Address { get; set; }
  }
}
