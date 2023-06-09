using AutoMapper;
using MyService.Dto;
using MyService.Repository;

namespace MyService.Services
{
  public class CursoService : ICursoService
  {
    private readonly ICursoRepository _cursoRepository;
    private readonly IMapper _mapper;

    public CursoService(ICursoRepository cursoRepository, IMapper mapper)
    {
      _cursoRepository=cursoRepository;
      _mapper=mapper;
    }


    public async Task<List<CursoDto>> GetAllCursos()
    {
      return _mapper.Map<List<CursoDto>>(await _cursoRepository.GetAllCursos());
    }
  }
}
