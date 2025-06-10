namespace Culturapp.Models.Requests;

public class CheckingRequest
{
  public DateTime? CheckInDate { get; set; }
  public EventRequest? EventRequest { get; set; }
  public ICollection<ClientUserRequest?>? ClientUserRequests { get; set; }
}