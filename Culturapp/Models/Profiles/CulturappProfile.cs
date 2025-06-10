using AutoMapper;
using Culturapp.Models.Requests;
using Culturapp.Models.Responses;

namespace Culturapp.Models.Profiles
{
  public class CulturappProfile : Profile
  {
    public CulturappProfile()
    {

      // ClientUser
      CreateMap<ClientUser, ClientUserRequest>().ReverseMap();
      CreateMap<ClientUser, ClientUserResponse>().ReverseMap();

      // EnterpriseUser
      CreateMap<EnterpriseUser, EnterpriseUserRequest>().ReverseMap();
      CreateMap<EnterpriseUser, EnterpriseUserResponse>().ReverseMap();

      // Register
      CreateMap<ApplicationUser, RegisterRequest>().ReverseMap();

      // Login
      CreateMap<Login, LoginRequest>().ReverseMap();

      // Address
      CreateMap<Address, AddressResponse>().ReverseMap();
      CreateMap<Address, AddressRequest>().ReverseMap();

      // Category
      CreateMap<Category, CategoryResponse>().ReverseMap();
      CreateMap<Category, CategoryRequest>().ReverseMap();

      // CheckIn
      CreateMap<Checking, CheckingRequest>().ReverseMap();
      CreateMap<Checking, CheckingResponse>()
        .ForMember(dest => dest.ClientUsers, opt => opt.MapFrom(src => src.ClientUsers))
        .ForMember(dest => dest.Event, opt => opt.MapFrom(src => src.Event))
        .ReverseMap();

      // Faq
      CreateMap<FAQ, FaqResponse>().ReverseMap();
      CreateMap<FAQ, FaqRequest>().ReverseMap();

      // Status
      CreateMap<Status, StatusRequest>().ReverseMap();
      CreateMap<Status, StatusResponse>().ReverseMap();

      // Phone
      CreateMap<Phone, PhoneRequest>().ReverseMap();
      CreateMap<Phone, PhoneResponse>().ReverseMap();

      // Event
      CreateMap<Event, EventRequest>().ReverseMap();
      CreateMap<Event, EventResponse>()
        .ForMember(dest => dest.EnterpriseUser, opt => opt.MapFrom(src => src.EnterpriseUser))
        .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.LocationAddress))
        .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
        .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
        .ForMember(dest => dest.Faq, opt => opt.MapFrom(src => src.FAQ))
        .ForMember(dest => dest.Checking, opt => opt.MapFrom(src => src.Checking))
        .ForMember(dest => dest.Phones, opt => opt.MapFrom(src => src.Phones))
        .ForMember(dest => dest.ClientUsers, opt => opt.MapFrom(src => src.ClientUsers));

    }
  }
}