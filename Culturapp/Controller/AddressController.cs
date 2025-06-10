using Culturapp.Models;
using Culturapp.Models.Requests;
using Culturapp.Models.Responses;
using Culturapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Culturapp.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class AddressController : ControllerBase
  {
    private readonly AddressService _addressService;

    public AddressController(AddressService addressService)
    {
      _addressService = addressService;
    }


    [HttpGet("GetAddress/{id}")]
    public async Task<ActionResult<Address>> GetAddress(int id)
    {
      var address = await _addressService.GetAddressByIdAsync(id);

      if (address == null)
      {
        return NotFound();
      }

      return Ok(address);
    }

    [HttpGet("GetAllAddresses")]
    public async Task<ActionResult<List<AddressResponse>>> GetAllAddresses()
    {
      var addresses = await _addressService.GetAllAddressesAsync();
      return Ok(addresses);
    }

    [HttpPost("PostAddress")]
    public async Task<ActionResult<Address>> PostAddress(AddressRequest addressRequest)
    {
      if (addressRequest == null)
      {
        return BadRequest();
      }

      await _addressService.CreateAddressAsync(addressRequest);
      return NoContent();
    }

    [HttpPut("PutAddress/{id}")]
    public async Task<IActionResult> PutAddress(int id, AddressRequest addressRequest)
    {
      var address = await _addressService.GetAddressByIdAsync(id);
      if (address == null)
      {
        return NotFound();
      }

      await _addressService.UpdateAddressAsync(id, addressRequest);
      return NoContent();
    }

    [HttpDelete("DeleteAddress/{id}")]
    public async Task<IActionResult> DeleteAddress(int id)
    {
      var address = await _addressService.GetAddressByIdAsync(id);
      if (address == null)
      {
        return NotFound();
      }

      await _addressService.DeleteAddressAsync(id);
      return NoContent();
    }
  }
}