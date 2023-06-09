using Microsoft.EntityFrameworkCore;
using MyService.Entities;

namespace MyService
{
  public partial class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Curso> Cursos { get; set; }
    public virtual DbSet<Estudiantes> Estudiantes { get; set; }
    public virtual DbSet<RegistroCurso> RegistroCursos { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//    {
//      if (!optionsBuilder.IsConfigured)
//      {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//        optionsBuilder.UseSqlServer("Server=localhost,1434;Database=SanFrancisco;Trusted_Connection=False;MultipleActiveResultSets=true;Trust Server Certificate=true; User ID=sa;Password=qweQWE123");
//      }
//    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Curso>(entity =>
      {
        entity.HasKey(e => e.IdCurso)
            .HasName("PK_CURSO");

        entity.ToTable("Curso");

        entity.Property(e => e.HoraFin)
            .HasMaxLength(10)
            .IsUnicode(false);

        entity.Property(e => e.HoraInicio)
            .HasMaxLength(10)
            .IsUnicode(false);

        entity.Property(e => e.Nombre)
            .HasMaxLength(32)
            .IsUnicode(false);
      });

      modelBuilder.Entity<Estudiantes>(entity =>
      {
        entity.HasKey(e => e.IdEstudiantes)
            .HasName("PK_ESTUDIANTES");

        entity.Property(e => e.Apellido)
            .HasMaxLength(32)
            .IsUnicode(false);

        entity.Property(e => e.Cedula)
            .HasMaxLength(10)
            .IsUnicode(false);

        entity.Property(e => e.Nombre)
            .HasMaxLength(32)
            .IsUnicode(false);
      });

      modelBuilder.Entity<RegistroCurso>(entity =>
      {
        entity.HasKey(e => e.IdRegistro)
            .HasName("PK_REGISTRO_CURSO");

        entity.ToTable("RegistroCurso");

        entity.Property(e => e.FechaRegistro).HasColumnType("datetime");

        entity.HasOne(d => d.IdCursoNavigation)
            .WithMany(p => p.RegistroCursos)
            .HasForeignKey(d => d.IdCurso)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_RESGISTRO_CURSO_REFERENCE_CURSO");

        entity.HasOne(d => d.IdEstudiantesNavigation)
            .WithMany(p => p.RegistroCursos)
            .HasForeignKey(d => d.IdEstudiantes)
            .HasConstraintName("FK_REGISTRO_CURSO_REFERENCE_ESTUDIANTES");
      });

      OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
  }
}
