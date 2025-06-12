using Culturapp.Models;
using Culturapp.Models.Requests;
using Culturapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Culturapp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PhoneController : ControllerBase
    {
        private readonly PhoneService _phoneService;

        public PhoneController(PhoneService phoneService)
        {
            _phoneService = phoneService;
        }

        [HttpGet("GetPhone/{id}")]
        public async Task<ActionResult<Phone>> GetPhone(int id)
        {
            var phone = await _phoneService.GetPhoneByIdAsync(id);

            if (phone == null)
            {
                return NotFound();
            }

            return Ok(phone);
        }

        [HttpPost("PostPhone")]
        public async Task<ActionResult<Phone>> PostPhone(PhoneRequest phoneRequest)
        {
            if (phoneRequest == null)
            {
                return BadRequest();
            }

            await _phoneService.AddPhoneAsync(phoneRequest);
            return NoContent();
        }

        [HttpPut("PutPhone/{id}")]
        public async Task<IActionResult> PutPhone(int id, PhoneRequest phoneRequest)
        {
            var phone = await _phoneService.GetPhoneByIdAsync(id);

            if (phone == null)
            {
                return NotFound();
            }

            await _phoneService.UpdatePhoneAsync(id, phoneRequest);
            return NoContent();
        }

        [HttpDelete("DeletePhone/{id}")]
        public async Task<IActionResult> DeletePhone(int id)
        {
            var phone = await _phoneService.GetPhoneByIdAsync(id);
            if (phone == null)
            {
                return NotFound();
            }

            await _phoneService.DeletePhoneAsync(id);
            return NoContent();
        }

        [HttpGet("GetPhoneIdByNumber/{phoneNumber}")]
        public async Task<ActionResult<int?>> GetPhoneIdByNumber(string phoneNumber)
        {
            if (string.IsNullOrEmpty(phoneNumber))
            {
                return BadRequest("Phone number cannot be null or empty.");
            }

            var phoneId = await _phoneService.GetPhoneIdByNumberAsync(phoneNumber);
            if (phoneId == null)
            {
                return NotFound();
            }

            return Ok(phoneId);

        }
    }
}