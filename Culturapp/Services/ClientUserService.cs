using AutoMapper;
using Culturapp.Data;
using Culturapp.Models;
using Culturapp.Models.Requests;
using Culturapp.Models.Responses;
using Microsoft.EntityFrameworkCore;

namespace Culturapp.Services
{
  public class ClientUserService
  {
    private readonly CulturappDbContext _context;
    private readonly IMapper _mapper;

    public ClientUserService(CulturappDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<List<ClientUserResponse>> GetClientUsersAsync()
    {
      var clientList = await _context.ClientUsers.Include(c => c.Phone).Include(c => c.Address).Include(c => c.Events).Include(c => c.Checks).ToListAsync();
      var clientUserResponses = _mapper.Map<List<ClientUserResponse>>(clientList);
      return clientUserResponses;
    }

    public async Task<ClientUserResponse?> GetClientUserByIdAsync(int id)
    {
      var clientUser = await _context.ClientUsers.Include(c => c.Phone).Include(c => c.Address).Include(c => c.Events).Include(c => c.Checks).FirstOrDefaultAsync(c => c.Id == id);
      var clientUserResponse = _mapper.Map<ClientUserResponse>(clientUser);
      return clientUserResponse;
    }

    public async Task<ClientUserResponse?> GetClientUserByEmailAsync(string email)
    {
      var clientUser = await _context.ClientUsers.Include(c => c.Phone).Include(c => c.Address).Include(c => c.Events).Include(c => c.Checks).FirstOrDefaultAsync(c => c.Email == email);
      var clientUserResponse = _mapper.Map<ClientUserResponse>(clientUser);
      return clientUserResponse;
    }

    public async Task<ClientUserResponse?> CreateClientUserAsync(ApplicationUser user)
    {
      var exists = await _context.ClientUsers
          .AnyAsync(u => u.CPF == user.CPF || u.Email == user.Email);

      if (exists) return null;

      var userClient = new ClientUser
      {
        Email = user.Email,
        CPF = user.CPF,
        FullName = user.FullName,
        UserName = user.UserName
      };

      _context.ClientUsers.Add(userClient);
      await _context.SaveChangesAsync();

      var clientUserResponse = _mapper.Map<ClientUserResponse>(userClient);

      return clientUserResponse;
    }

    public async Task<ClientUserResponse?> UpdateClientUserAsync(int id, ClientUserRequest clientUserRequest)
    {
      var existing = await _context.ClientUsers
        .Include(c => c.Events)
        .Include(c => c.Checks)
        .FirstOrDefaultAsync(c => c.Id == id);

      if (existing == null) return null;

      existing.FullName = clientUserRequest.FullName;
      existing.UserName = clientUserRequest.UserName;
      existing.CPF = clientUserRequest.CPF;
      existing.Phone = clientUserRequest.PhoneId != null
        ? await _context.Phones.FindAsync(clientUserRequest.PhoneId)
        : null;

      existing.Address = await _context.Addresses.FindAsync(clientUserRequest.AddressId);

      if (clientUserRequest.EventId != null &&
          !existing.Events!.Any(e => e!.Id == clientUserRequest.EventId))
      {
        var ev = await _context.Events.FindAsync(clientUserRequest.EventId);
        if (ev != null)
          existing.Events!.Add(ev);
      }

      if (clientUserRequest.CheckId != null &&
          !existing.Checks!.Any(c => c!.Id == clientUserRequest.CheckId))
      {
        var check = await _context.Checks.FindAsync(clientUserRequest.CheckId);
        if (check != null)
          existing.Checks!.Add(check);
      }

      await _context.SaveChangesAsync();
      var updatedResponse = _mapper.Map<ClientUserResponse>(existing);
      return updatedResponse;
    }


    public async Task<ClientUserResponse?> DeleteClientUserAsync(int id)
    {
      var user = await _context.ClientUsers.FindAsync(id);
      if (user == null) return null;

      _context.ClientUsers.Remove(user);
      await _context.SaveChangesAsync();
      var deletedResponse = _mapper.Map<ClientUserResponse>(user);
      return deletedResponse;
    }

    public async Task<CheckingRequest?> DoCheckingAsync(int checkingId, int clientUserId)
    {
      var checking = await _context.Checks
          .Include(c => c.ClientUsers)
          .FirstOrDefaultAsync(c => c.Id == checkingId);

      if (checking == null || checking.CheckingDate < DateTime.Now)
        return null; // Checking not found or time has passed

      var clientUser = await _context.ClientUsers.FindAsync(clientUserId);
      if (clientUser == null)
        return null;

      if (checking.ClientUsers?.Any(c => c!.Id == clientUserId) == true)
        return null; // Already checked in

      checking.ClientUsers!.Add(clientUser);
      await _context.SaveChangesAsync();

      return _mapper.Map<CheckingRequest>(checking);
    }
  }
}