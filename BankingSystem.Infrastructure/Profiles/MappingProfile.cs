using AutoMapper;
using BankingSystem.Domain.Entities;
using BankingSystem.Infrastructure.DAOs;

namespace BankingSystem.Infrastructure.Profiles;

public class InfrastructureMappingProfile : Profile
{
    public InfrastructureMappingProfile()
    {
        CreateMap<Account, AccountDao>()
            .ForMember(dest => dest.AccountId, opt => opt.MapFrom(src => src.AccountId))
            .ForMember(dest => dest.OwnerId, opt => opt.MapFrom(src => src.OwnerId))
            .ForMember(dest => dest.OwnerName, opt => opt.MapFrom(src => src.OwnerName))
            .ForMember(dest => dest.Balance, opt => opt.MapFrom(src => src.Balance));

        CreateMap<AccountDao, Account>()
            .ForMember(dest => dest.AccountId, opt => opt.MapFrom(src => src.AccountId))
            .ForMember(dest => dest.OwnerId, opt => opt.MapFrom(src => src.OwnerId))
            .ForMember(dest => dest.OwnerName, opt => opt.MapFrom(src => src.OwnerName))
            .ForMember(dest => dest.Balance, opt => opt.MapFrom(src => src.Balance));

        CreateMap<Transaction, TransactionDao>()
            .ForMember(dest => dest.TransactionId, opt => opt.MapFrom(src => src.TransactionId))
            .ForMember(dest => dest.AccountId, opt => opt.MapFrom(src => src.AccountId))
            .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
            .ForMember(dest => dest.OccurredOn, opt => opt.MapFrom(src => src.OccurredOn));

        CreateMap<TransactionDao, Transaction>()
            .ForMember(dest => dest.TransactionId, opt => opt.MapFrom(src => src.TransactionId))
            .ForMember(dest => dest.AccountId, opt => opt.MapFrom(src => src.AccountId))
            .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
            .ForMember(dest => dest.OccurredOn, opt => opt.MapFrom(src => src.OccurredOn));
    }
}
