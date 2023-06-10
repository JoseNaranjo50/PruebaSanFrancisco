using MyService.Entities;

namespace MyService.Repository
{
    public interface IRegistroRepository
    {
        public Task<List<RegistroCurso>> GetAll();
        public Task<List<Estudiantes>> GetEstudiantesByCurso(int idCurso);

        public Task<int> RegistrarEstudiantesCurso(RegistroCurso registro);

        public Task<bool> EliminarEstudiantesCurso(int idEstudiante, int idCurso);

    }
}
