using MyService.Dto;

namespace MyService.Services
{
    public interface IEstudiantesService
    {
        Task<List<EstudiantesDto>> getAll();
    }
}
