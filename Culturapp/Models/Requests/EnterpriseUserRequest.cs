using System.ComponentModel.DataAnnotations;

namespace Culturapp.Models.Requests
{
  public class EnterpriseUserRequest
  {
    public string? FullName { get; set; }
    public string? UserName { get; set; }

    // [StringLength(14, MinimumLength = 14)]
    // [RegularExpression(@"^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$", ErrorMessage = "CNPJ inválido. Formato esperado: 00.000.000/0000-00")]
    [StringLength(14, MinimumLength = 14)]
    public string? CNPJ { get; set; }

    public int? PhoneId { get; set; }
    public int? AddressId { get; set; }
  }
}
