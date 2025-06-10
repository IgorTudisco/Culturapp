using AutoMapper;
using Culturapp.Data;
using Culturapp.Models;
using Culturapp.Models.Requests;

namespace Culturapp.Services
{
  public class PhoneService
  {
    private readonly CulturappDbContext _context;
    private readonly IMapper _mapper;

    public PhoneService(CulturappDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<Phone?> GetPhoneByIdAsync(int id)
    {
      return await _context.Phones.FindAsync(id);
    }

    public async Task AddPhoneAsync(PhoneRequest phoneRequest)
    {
      var phone = _mapper.Map<Phone>(phoneRequest);
      _context.Phones.Add(phone);
      await _context.SaveChangesAsync();
    }

    public async Task<Phone?> UpdatePhoneAsync(int id, PhoneRequest phoneRequest)
    {
      var phone = await _context.Phones.FindAsync(id);

      if (phone == null || phoneRequest == null)
      {
        return null;
      }

      _mapper.Map(phoneRequest, phone);

      _context.Phones.Update(phone);
      await _context.SaveChangesAsync();

      return phone;
    }

    public async Task DeletePhoneAsync(int id)
    {
      var phone = await _context.Phones.FindAsync(id);
      if (phone != null)
      {
        _context.Phones.Remove(phone);
        await _context.SaveChangesAsync();
      }
    }
  }
}