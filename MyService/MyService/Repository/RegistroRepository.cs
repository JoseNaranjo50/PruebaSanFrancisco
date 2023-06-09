using Microsoft.EntityFrameworkCore;
using MyService.Entities;

namespace MyService.Repository
{
  public class RegistroRepository : IRegistroRepository
  {
    private readonly ApplicationDbContext _context;

    public RegistroRepository(ApplicationDbContext context)
    {
      _context=context;
    }


    public async Task<bool> EliminarEstudiantesCurso(int idEstudiante, int idCurso)
    {
      try
      {
        var registro = await _context.RegistroCursos.FirstOrDefaultAsync(stu => stu.IdEstudiantes == idEstudiante  && stu.IdCurso==idCurso);
        if (registro== null)
        {
          throw new Exception("Estudiante no se encuentra registrado en este curso");
        }
        _context.RegistroCursos.Remove(registro);
        await _context.SaveChangesAsync();
        return true;
      }
      catch (Exception)
      {
        throw new Exception("Error al eliminar estudiante");
      }
    }

    public async Task<List<Estudiantes>> GetEstudiantesByCurso(int idCurso)
    {
      var estudintes = await _context.RegistroCursos.Include(est => est.IdCursoNavigation).Include(est => est.IdEstudiantesNavigation)
        .Where(lst => lst.IdCursoNavigation.IdCurso.Equals(idCurso)).Select(est => est.IdEstudiantesNavigation).ToListAsync();
      return estudintes;
    }


    public async Task<int> RegistrarEstudiantesCurso(RegistroCurso registro)
    {
      try
      {
        await _context.AddAsync(registro);
        return await _context.SaveChangesAsync();


      }
      catch (Exception)
      {
        throw new Exception("Error al ingresar estudiante al curso");
      }

    }
  }
}
