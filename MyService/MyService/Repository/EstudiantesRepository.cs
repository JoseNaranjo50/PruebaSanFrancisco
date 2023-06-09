using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyService.Entities;

namespace MyService.Repository
{
    public class EstudiantesRepository : IEstudiantesRepository
    {
        private readonly ApplicationDbContext context;

        public EstudiantesRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Estudiantes>> getAll() =>
            await context.Estudiantes.AsNoTracking().ToListAsync();

    }
}
