using MyService.Entities;
using System.ComponentModel.DataAnnotations;

namespace MyService.Dto
{
    public class CursoDto
    {

    public int IdCurso { get; set; }
    public string Nombre { get; set; }
    public string HoraInicio { get; set; }
    public string HoraFin { get; set; }
    public int? NumeroCreditos { get; set; }

    public virtual List<RegistroCursoDto> RegistroCursos { get; set; }
  }
}
