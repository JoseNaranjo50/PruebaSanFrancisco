using System.ComponentModel.DataAnnotations;

namespace MyService.Entities
{
  public partial class Curso
  {
    public Curso()
    {
      RegistroCursos = new List<RegistroCurso>();
    }

    public int IdCurso { get; set; }
    public string Nombre { get; set; }
    public string HoraInicio { get; set; }
    public string HoraFin { get; set; }
    public int? NumeroCreditos { get; set; }

    public virtual ICollection<RegistroCurso> RegistroCursos { get; set; }
  }
}
