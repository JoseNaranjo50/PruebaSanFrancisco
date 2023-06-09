using MyService.Dto;

namespace MyService.Services
{
  public interface ICursoService
  {
    public Task<List<CursoDto>> GetAllCursos();
  }
}
