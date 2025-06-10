using AutoMapper;
using Culturapp.Data;
using Culturapp.Models;
using Culturapp.Models.Requests;
using Culturapp.Models.Responses;
using Microsoft.EntityFrameworkCore;

namespace Culturapp.Services
{
  public class EnterpriseUserService
  {

    private readonly CulturappDbContext _context;
    private readonly IMapper _mapper;

    public EnterpriseUserService(CulturappDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<List<EnterpriseUserResponse>> GetEnterpriseUsersAsync()
    {
      var enterpriseList = await _context.EnterpriseUsers.ToListAsync();
      var enterpriseUserResponseList = _mapper.Map<List<EnterpriseUserResponse>>(enterpriseList);
      return enterpriseUserResponseList;
    }

    public async Task<EnterpriseUserResponse?> GetEnterpriseUserByIdAsync(int id)
    {
      var enterpriseUser = await _context.EnterpriseUsers.FindAsync(id);
      var enterpriseUserResponse = _mapper.Map<EnterpriseUserResponse>(enterpriseUser);
      return enterpriseUserResponse;
    }

    public async Task<EnterpriseUserResponse?> GetEnterpriseUserEmailAsync(string email)
    {
      var enterpriseUser = await _context.EnterpriseUsers.Include(e => e.Phones).Include(e => e.Address).FirstOrDefaultAsync(e => e.Email == email);
      var enterpriseUserResponse = _mapper.Map<EnterpriseUserResponse>(enterpriseUser);
      return enterpriseUserResponse;
    }

    public async Task<EnterpriseUserResponse?> CreateEnterpriseUserAsync(ApplicationUser user)
    {
      var userEnterprise = new EnterpriseUser
      {
        Email = user!.Email,
        CNPJ = user.CNPJ,
        FullName = user.FullName,
        UserName = user.UserName
      };

      var existingUser = await _context.EnterpriseUsers.FirstOrDefaultAsync(u => u.CNPJ == userEnterprise.CNPJ || u.Email == userEnterprise.Email);
      if (existingUser != null)
      {
        return null;
      }
      else
      {
        _context.EnterpriseUsers.Add(userEnterprise);
        await _context.SaveChangesAsync();
        var userEnterpriseResponse = _mapper.Map<EnterpriseUserResponse>(userEnterprise);
        return userEnterpriseResponse;
      }
    }

    public async Task<EnterpriseUserResponse?> UpdateEnterpriseUserAsync(int id, EnterpriseUserRequest enterpriseUserRequest)
    {
      var existingEnterpriseUser = await _context.EnterpriseUsers
        .Include(e => e.Phones)
        .FirstOrDefaultAsync(e => e.Id == id);
      if (existingEnterpriseUser == null)
        return null;

      existingEnterpriseUser.UserName = enterpriseUserRequest.UserName;
      existingEnterpriseUser.FullName = enterpriseUserRequest.FullName;
      existingEnterpriseUser.CNPJ = enterpriseUserRequest.CNPJ;
      existingEnterpriseUser.AddressId = enterpriseUserRequest.AddressId;

      var phone = await _context.Phones.FindAsync(enterpriseUserRequest.PhoneId);
      if (phone != null)
      {
        if (!existingEnterpriseUser.Phones!.Contains(phone))
        {
          // If the phone is not already associated with the enterprise user, add it
          existingEnterpriseUser.Phones.Add(phone);
        }
      }

      await _context.SaveChangesAsync();
      var enterpriseUserResponse = _mapper.Map<EnterpriseUserResponse>(existingEnterpriseUser);

      return enterpriseUserResponse;
    }

    public async Task<EnterpriseUser?> DeleteEnterpriseUserAsync(int id)
    {
      var userEnterprise = await _context.EnterpriseUsers.FindAsync(id);
      if (userEnterprise != null)
      {
        _context.EnterpriseUsers.Remove(userEnterprise);
        await _context.SaveChangesAsync();
      }
      return userEnterprise;
    }

  }
}