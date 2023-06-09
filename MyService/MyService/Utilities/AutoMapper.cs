using AutoMapper;
using MyService.Dto;
using MyService.Entities;

namespace MyService.Utilities
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            
            CreateMap<EstudiantesDto, Estudiantes>().ReverseMap();
            CreateMap<CursoDto, Curso>().ReverseMap();
            CreateMap<RegistroCursoDto, RegistroCurso>().ReverseMap();
        }
    }
}
