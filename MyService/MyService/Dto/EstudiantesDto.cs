using MyService.Entities;
using System.ComponentModel.DataAnnotations;

namespace MyService.Dto
{
    public class EstudiantesDto
    {

    public int IdEstudiantes { get; set; }
    public string Cedula { get; set; }
    public string Nombre { get; set; }
    public string Apellido { get; set; }
    public int? Edad { get; set; }

    public virtual List<RegistroCursoDto> RegistroCursos { get; set; }
  }
}
