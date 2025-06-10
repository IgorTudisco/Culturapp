namespace Culturapp.Models.Responses
{
  public class CheckingResponse
  {
    public int? Id { get; set; }
    public DateTime? CheckInDate { get; set; }
    public EventResponse? Event { get; set; }
    public ICollection<ClientUserResponse?>? ClientUsers { get; set; }
  }
}
