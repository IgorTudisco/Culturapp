namespace Culturapp.Models.Responses;

public class StatusResponse
{
  public int? Id { get; set; }
  public string? StatusName { get; set; }

  public ICollection<EventResponse>? Events { get; set; }
}
