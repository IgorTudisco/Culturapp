using Microsoft.AspNetCore.Mvc;
using Culturapp.Services;
using Culturapp.Models.Requests;
using Microsoft.AspNetCore.Authorization;

namespace Culturapp.Controller
{
  [Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class EnterpriseUserController : ControllerBase
  {
    private readonly EnterpriseUserService _enterpriseUserService;

    public EnterpriseUserController(EnterpriseUserService enterpriseUserService)
    {
      _enterpriseUserService = enterpriseUserService;
    }

    [HttpGet("GetEnterpriseUsers")]
    public async Task<IActionResult> GetEnterpriseUsers()
    {
      var users = await _enterpriseUserService.GetEnterpriseUsersAsync();
      return Ok(users);
    }

    [HttpGet("GetEnterpriseUserById/{id}")]
    public async Task<IActionResult> GetEnterpriseUserById(int id)
    {
      var user = await _enterpriseUserService.GetEnterpriseUserByIdAsync(id);
      if (user == null)
      {
        return NotFound();
      }
      return Ok(user);
    }

    [HttpPut("UpdateEnterpriseUser/{id}")]
    public async Task<IActionResult> PutEnterpriseUser(int id, [FromBody] EnterpriseUserRequest enterpriseUserRequest)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var updatedUser = await _enterpriseUserService.UpdateEnterpriseUserAsync(id, enterpriseUserRequest);
      if (updatedUser == null)
      {
        return NotFound();
      }

      return NoContent();
    }

    [HttpDelete("DeleteEnterpriseUser/{id}")]
    public async Task<IActionResult> DeleteEnterpriseUser(int id)
    {
      var result = await _enterpriseUserService.DeleteEnterpriseUserAsync(id);
      if (result == null)
      {
        return NotFound();
      }

      return NoContent();
    }
  }
}