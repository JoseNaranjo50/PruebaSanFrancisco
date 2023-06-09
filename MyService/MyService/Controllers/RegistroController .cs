using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyService.Authentication;
using MyService.Dto;
using MyService.Services;

namespace MyService.Controllers
{
  [ApiController]
  [Route("/api/[controller]")]
  public class RegistroController : ControllerBase
  {
    private readonly IRegistroService _registro;

    public RegistroController(IRegistroService registro)
    {
      _registro=registro;
    }

    [HttpGet("getestudiantesbycurso")]
    public async Task<ActionResult<List<CursoDto>>> GetEstudiantesByCurso([FromQuery] int idCurso)
    {
      var response = await _registro.GetEstudiantesByCurso(idCurso);
      return Ok(response);
    }

    [HttpPost("registrarestudiantescurso")]
    public async Task<ActionResult<List<CursoDto>>> RegistrarEstudiantesCurso([FromBody] RegistroCursoDto registro)
    {
      var response = await _registro.RegistrarEstudiantesCurso(registro);
      return Ok(response);
    }

    [HttpDelete("eliminarestudiantescurso")]
    public async Task<ActionResult<List<CursoDto>>> EliminarEstudiantesCurso([FromBody] RegistroCursoDto registro)
    {
      var response = await _registro.EliminarEstudiantesCurso(registro.IdEstudiantes.Value,registro.IdCurso);
      return Ok(response);
    }


  }
}
