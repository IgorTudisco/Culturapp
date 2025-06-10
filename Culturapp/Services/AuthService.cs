
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Culturapp.Models;
using Culturapp.Models.Requests;
using Culturapp.Models.Responses;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Culturapp.Services
{
  public class AuthService
  {
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly ClientUserService _clientUserService;
    private readonly EnterpriseUserService _enterpriseUserService;

    public AuthService(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IConfiguration configuration,
        IMapper mapper, ClientUserService clientUserService, EnterpriseUserService enterpriseUserService
    )
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _configuration = configuration;
      _mapper = mapper;
      _clientUserService = clientUserService;
      _enterpriseUserService = enterpriseUserService;
    }

    public async Task<object?> RegisterAsync(RegisterRequest registerRequest)
    {

      var existingEmail = await _userManager.Users
        .FirstOrDefaultAsync(u => u.Email == registerRequest.Email);

      if (existingEmail != null)
      {
        return null; // Email already exists
      }

      var user = _mapper.Map<ApplicationUser>(registerRequest);

      var createUser = new IdentityUser();

      var userClient = new ClientUserResponse();
      var userEnterprise = new EnterpriseUserResponse();

      switch (user.AccountType)
      {
        case 0:
          userClient = await _clientUserService.CreateClientUserAsync(user);
          if (userClient == null)
          {
            return null; // Client user creation failed, possibly due to existing CPF or Email
          }
          await _userManager.CreateAsync(user, registerRequest.Password!);
          break;
        case (Models.Enum.AccountType)1:
          userEnterprise = await _enterpriseUserService.CreateEnterpriseUserAsync(user);
          if (userEnterprise == null)
          {
            return null; // Enterprise user creation failed, possibly due to existing CNPJ or Email
          }
          await _userManager.CreateAsync(user, registerRequest.Password!);
          break;
        default:
          return null; // Invalid account type
      }

      if (userClient != null || userEnterprise != null)
      {
        return "ok"; // User created successfully
      }
      else
      {
        return null;
      }

    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest loginRequest)
    {
      if (string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
      {
        throw new ArgumentException("Email and Password cannot be null or empty.");
      }

      var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

      if (user != null)
      {
        var result = await _signInManager.PasswordSignInAsync(user.UserName!, loginRequest.Password, false, false);

        if (result.Succeeded)
        {
          var token = GenerateToken(user);
          var userClient = await _clientUserService.GetClientUserByEmailAsync(user.Email!);
          var userEnterprise = await _enterpriseUserService.GetEnterpriseUserEmailAsync(user.Email!);

          if (userClient != null)
          {
            return new LoginResponse
            {
              Token = token,
              AccountType = user.AccountType.ToString(),
              UserName = user.UserName,
              Email = user.Email,
              UserId = userClient.Id
            };
          }
          else if (userEnterprise != null)
          {
            return new LoginResponse
            {
              Token = token,
              AccountType = user.AccountType.ToString(),
              UserName = user.UserName,
              Email = user.Email,
              UserId = userEnterprise.Id
            };
          }

        }
      }

      return null;
    }

    private string GenerateToken(ApplicationUser? user)
    {
      var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user?.UserName!),
                new Claim(ClaimTypes.Email, user?.Email!),
                new Claim("AccountType", user?.AccountType.ToString()!),
                new Claim(ClaimTypes.NameIdentifier, user?.Id!),
                new Claim(JwtRegisteredClaimNames.Sub, user?.UserName!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

      var authSigningKey = new SymmetricSecurityKey(
          Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured."))
      );

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(authClaims),
        Expires = DateTime.UtcNow.AddHours(1),
        Issuer = _configuration["Jwt:Issuer"],
        Audience = _configuration["Jwt:Audience"],
        SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
      };

      var tokenHandler = new JwtSecurityTokenHandler();
      var securityToken = tokenHandler.CreateToken(tokenDescriptor);
      string tokenString = tokenHandler.WriteToken(securityToken);

      return tokenString;

    }

  }
}
