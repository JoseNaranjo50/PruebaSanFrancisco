using MyService.Dto;

namespace MyService.Services
{
    public interface IRegistroService
    {
        public Task<List<EstudiantesDto>> GetAll();
        public Task<List<EstudiantesDto>> GetEstudiantesByCurso(int idCurso);

        public Task<int> RegistrarEstudiantesCurso(RegistroCursoDto registro);

        public Task<bool> EliminarEstudiantesCurso(int idEstudiante, int idCurso);
    }
}
