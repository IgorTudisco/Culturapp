using System.ComponentModel.DataAnnotations;

namespace Culturapp.Models.Requests
{
  public class ClientUserRequest
  {
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public int? PhoneId { get; set; }

    // [StringLength(14, MinimumLength = 14)]
    // [RegularExpression(@"^\d{3}\.\d{3}\.\d{3}-\d{2}$", ErrorMessage = "CPF inválido. Formato esperado: 000.000.000-00")]
    [StringLength(11, MinimumLength = 11)]
    public string? CPF { get; set; }

    public int? AddressId { get; set; }
    public int? EventId { get; set; }
    public int? CheckId { get; set; }
  }
}
