using AutoMapper;
using MyService.Dto;
using MyService.Entities;
using MyService.Repository;

namespace MyService.Services
{
  public class RegistroService : IRegistroService
  {
    private readonly IRegistroRepository _registroRepository;
    private readonly IMapper _mapper;

    public RegistroService(IRegistroRepository registroRepository, IMapper mapper)
    {
      _registroRepository=registroRepository;
      _mapper=mapper;
    }
    public async Task<bool> EliminarEstudiantesCurso(int idEstudiante, int idCurso)
    {
      return await _registroRepository.EliminarEstudiantesCurso(idEstudiante,idCurso);
    }

    public async Task<List<EstudiantesDto>> GetEstudiantesByCurso(int idCurso)
    {
      return _mapper.Map<List<EstudiantesDto>>(await _registroRepository.GetEstudiantesByCurso(idCurso));
    }

    public async Task<int> RegistrarEstudiantesCurso(RegistroCursoDto registro)
    {
      return await _registroRepository.RegistrarEstudiantesCurso(_mapper.Map<RegistroCurso>(registro));
    }

  }
}
