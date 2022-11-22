using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Add as many of these lines as you need to map your objects
            // CreateMap<Source, Destination>();
            CreateMap<Activity, Activity>();
        }
    }
}