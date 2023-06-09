using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyService.Authentication;
using MyService.Dto;
using MyService.Services;

namespace MyService.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class EstudiantesController : ControllerBase
    {
        private readonly IEstudiantesService _estudiantesService;

        public EstudiantesController(IEstudiantesService estudiantesService)
        {
            _estudiantesService = estudiantesService;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<EstudiantesDto>> getAll()
        {
            var response =await _estudiantesService.getAll();
            return Ok(response);
        }
    }
}
