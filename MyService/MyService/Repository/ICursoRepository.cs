using MyService.Entities;

namespace MyService.Repository
{
  public interface ICursoRepository
  {
    public Task<List<Curso>> GetAllCursos();
  }
}
