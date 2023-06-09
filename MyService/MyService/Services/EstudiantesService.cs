using AutoMapper;
using MyService.Dto;
using MyService.Repository;

namespace MyService.Services
{
    public class EstudiantesService : IEstudiantesService
    {
        private readonly IEstudiantesRepository estudiantesRepository;
        private readonly IMapper mapper;

        public EstudiantesService(IEstudiantesRepository estudiantesRepository, IMapper mapper)
        {
            this.estudiantesRepository = estudiantesRepository;
            this.mapper = mapper;
        }

        public async Task<List<EstudiantesDto>> getAll()
        {
            var result = await estudiantesRepository.getAll();
            var estudiantes = mapper.Map<List<EstudiantesDto>>(result);
            return estudiantes;
        }
    }
}
