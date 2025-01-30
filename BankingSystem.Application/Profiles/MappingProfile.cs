using AutoMapper;
using BankingSystem.Application.DTOs;
using BankingSystem.Domain.Entities;

namespace BankingSystem.Application.Profiles
{
      public class ApplicationMappingProfile : Profile
      {
            public ApplicationMappingProfile()
            {
                  CreateMap<Account, AccountDto>();
                  CreateMap<Transaction, TransactionDto>()
                      .ForMember(dest => dest.Type,
                          opt => opt.MapFrom(src => src.Type.ToString()));
            }
      }
}