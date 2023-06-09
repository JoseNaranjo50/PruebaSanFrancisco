using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyService.Authentication;
using MyService.Dto;
using MyService.Services;

namespace MyService.Controllers
{
  [ApiController]
  [Route("/api/[controller]")]
  public class CursoController : ControllerBase
  {
    private readonly ICursoService _cursoService;

    public CursoController(ICursoService cursoService)
    {
      _cursoService=cursoService;
    }

    /// <summary>
    /// Obtiene todos los cursos disponibles
    /// </summary>
    /// <returns></returns>

    [HttpGet("getallcursos")]
    public async Task<ActionResult<List<CursoDto>>> GetAllCursos()
    {
      var response = await _cursoService.GetAllCursos();
      return Ok(response);
    }
  }
}
