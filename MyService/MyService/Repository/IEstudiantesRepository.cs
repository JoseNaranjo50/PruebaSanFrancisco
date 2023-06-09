using MyService.Entities;

namespace MyService.Repository
{
    public interface IEstudiantesRepository
    {
        Task<List<Estudiantes>> getAll();
    }
}
