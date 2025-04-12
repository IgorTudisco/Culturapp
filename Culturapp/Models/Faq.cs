using System;
using System.ComponentModel.DataAnnotations;

namespace Culturapp.Models
{
  public class Faq
  {
    [Key]
    public int Id { get; set; }
    public string? Question { get; set; }
    public string? Answer { get; set; }
  }
}