using MyService.Entities;
using System.ComponentModel.DataAnnotations;

namespace MyService.Dto
{
    public class RegistroCursoDto
    {
    public int IdRegistro { get; set; }
    public int IdCurso { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int? IdEstudiantes { get; set; }

    public virtual CursoDto IdCursoNavigation { get; set; }
    public virtual EstudiantesDto IdEstudiantesNavigation { get; set; }
  }
}
