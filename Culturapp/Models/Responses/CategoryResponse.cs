namespace Culturapp.Models.Responses
{
  public class CategoryResponse
  {
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }


    public List<EventResponse>? Events { get; set; }
  }
}
