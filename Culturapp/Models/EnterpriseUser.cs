using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Culturapp.Models
{
  [Table("EnterpriseUsers")]
  public class EnterpriseUser
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string? UserName { get; set; } // this is the fantasy name of the enterprise
    public string? FullName { get; set; } // this is the name of the enterprise
    public string? CNPJ { get; set; }
    public string? Email { get; set; }
    public ICollection<Event?>? Events { get; set; }
    public ICollection<Phone?>? Phones { get; set; }
    public int? AddressId { get; set; }
    public Address? Address { get; set; }

  }
}
