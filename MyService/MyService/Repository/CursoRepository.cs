using Microsoft.EntityFrameworkCore;
using MyService.Entities;

namespace MyService.Repository
{
  public class CursoRepository : ICursoRepository
  {
    private readonly ApplicationDbContext _dbContext;

    public CursoRepository(ApplicationDbContext dbContext)
    {
      _dbContext = dbContext;
    }

    public async Task<List<Curso>> GetAllCursos()
    {
      return await _dbContext.Cursos.ToListAsync();
    }
  }
}
