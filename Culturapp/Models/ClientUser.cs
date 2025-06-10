using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Culturapp.Models
{
    [Table("ClientUsers")]
    public class ClientUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public Phone? Phone { get; set; }
        public string? CPF { get; set; }
        public Address? Address { get; set; }
        public ICollection<Event?>? Events { get; set; }
        public ICollection<Checking?>? Checks { get; set; }
    }

}

