using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Culturapp.Models;

[Table("Statuses")]
public class Status
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }
  public string? StatusName { get; set; } // Ativo, cancelado, etc.
  public ICollection<Event?>? Events { get; set; } // Eventos que estão com esse status
}

