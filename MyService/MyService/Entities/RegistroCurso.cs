using System.ComponentModel.DataAnnotations;

namespace MyService.Entities
{
    public class RegistroCurso
    {
    public int IdRegistro { get; set; }
    public int IdCurso { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int? IdEstudiantes { get; set; }

    public virtual Curso IdCursoNavigation { get; set; }
    public virtual Estudiantes IdEstudiantesNavigation { get; set; }
  }
}
