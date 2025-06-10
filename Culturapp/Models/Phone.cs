using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Culturapp.Models
{
  [Table("Telephones")]
  public class Phone
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string? AreaCode { get; set; }  // Changed "DDD" to "AreaCode" for clarity
    public string? PhoneNumber { get; set; }
    public int? EnterpriseId { get; set; }
    public EnterpriseUser? EnterpriseUser { get; set; }
    public int? EventId { get; set; }
    public Event? Event { get; set; }
  }
}

