namespace Culturapp.Models.Responses
{
  public class FaqResponse
  {
    public int? Id { get; set; }
    public string? Question { get; set; }
    public string? Answer { get; set; }

    public EventResponse? Event { get; set; }
  }
}