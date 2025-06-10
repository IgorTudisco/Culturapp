using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Culturapp.Models;

[Table("Checks")]
public class Checking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public DateTime? CheckingDate { get; set; }
    public Event? Event { get; set; }
    public ICollection<ClientUser?>? ClientUsers { get; set; }
}