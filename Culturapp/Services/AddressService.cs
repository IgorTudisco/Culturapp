using AutoMapper;
using Culturapp.Data;
using Culturapp.Models;
using Culturapp.Models.Requests;
using Culturapp.Models.Responses;
using Microsoft.EntityFrameworkCore;

namespace Culturapp.Services
{
  public class AddressService
  {
    private readonly CulturappDbContext _context;
    private readonly IMapper _mapper;

    public AddressService(CulturappDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<AddressResponse?> GetAddressByIdAsync(int id)
    {
      var address = await _context.Addresses.Include(a => a.Event).Include(a => a.EnterpriseUser).FirstOrDefaultAsync(a => a.Id == id);
      var addressResponse = _mapper.Map<AddressResponse>(address);
      return addressResponse;
    }

    public async Task<List<AddressResponse>> GetAllAddressesAsync()
    {
      var addresses = await _context.Addresses.Include(a => a.Event).Include(a => a.EnterpriseUser).ToListAsync();
      var addressResponses = _mapper.Map<List<AddressResponse>>(addresses);
      return addressResponses;
    }

    public async Task<int?> GetAddressIdByZipCodeAsync(string zipCode)
    {
      var address = await _context.Addresses.FirstOrDefaultAsync(a => a.ZipCode == zipCode);
      return address?.Id;
    }

    public async Task<AddressResponse?> CreateAddressAsync(AddressRequest addressRequest)
    {
      var existingAddress = await _context.Addresses.FirstOrDefaultAsync(
        a =>
        a.ZipCode == addressRequest.ZipCode &&
        a.Street == addressRequest.Street &&
        a.AddressNumber == addressRequest.AddressNumber &&
        a.Complement == addressRequest.Complement &&
        a.Neighborhood == addressRequest.Neighborhood &&
        a.City == addressRequest.City &&
        a.State == addressRequest.State
      );
      if (existingAddress != null)
      {
        return null;
      }
      var address = _mapper.Map<Address>(addressRequest);
      _context.Addresses.Add(address);
      await _context.SaveChangesAsync();
      var addressResponse = _mapper.Map<AddressResponse>(address);
      return addressResponse;
    }

    public async Task<AddressResponse?> UpdateAddressAsync(int id, AddressRequest? addressRequest)
    {
      var address = await _context.Addresses.FindAsync(id);

      if (address == null || addressRequest == null)
      {
        return null;
      }

      // Map updated fields from request to entity
      _mapper.Map(addressRequest, address);

      _context.Addresses.Update(address);
      await _context.SaveChangesAsync();

      var addressResponse = _mapper.Map<AddressResponse>(address);
      return addressResponse;
    }

    public async Task DeleteAddressAsync(int id)
    {
      var address = await _context.Addresses.FindAsync(id);
      if (address != null)
      {
        _context.Addresses.Remove(address);
        await _context.SaveChangesAsync();
      }
    }
  }
}