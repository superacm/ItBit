using AutoMapper;
using Ezconet.API.Dtos;
using Ezconet.Domain;

namespace Ezconet.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Usuario, UsuarioDto>();
            CreateMap<Sexo, SexoDto>();

            
            
        }
    }
}