using System.ComponentModel.DataAnnotations;

namespace MyService.Entities
{
    public class Estudiantes
    {
    public Estudiantes()
    {
      RegistroCursos = new List<RegistroCurso>();
    }

    public int IdEstudiantes { get; set; }
    public string Cedula { get; set; }
    public string Nombre { get; set; }
    public string Apellido { get; set; }
    public int? Edad { get; set; }

    public virtual ICollection<RegistroCurso> RegistroCursos { get; set; }
  }
}
