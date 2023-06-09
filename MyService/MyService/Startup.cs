using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MyService.Authentication;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using MyService.Repository;
using MyService.Services;

namespace MyService
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }


    public void ConfigureServices(IServiceCollection services)
    {
      // Add services to the container.

      services.AddControllers().AddJsonOptions(x =>
      x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
      );
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
      {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidateLifetime = true,
          ValidateIssuerSigningKey = true,
          ValidAudience = Configuration["Jwt:Audience"],
          ValidIssuer = Configuration["Jwt:Issuer"],
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
        };
      });

      services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("defaultConnection")));

      services.AddScoped<IEstudiantesRepository, EstudiantesRepository>();
      services.AddScoped<IEstudiantesService, EstudiantesService>();


      services.AddScoped<ICursoRepository, CursoRepository>();
      services.AddScoped<ICursoService, CursoService>();

      services.AddScoped<IEstudiantesRepository, EstudiantesRepository>();
      services.AddScoped<IEstudiantesService, EstudiantesService>();

      services.AddScoped<IRegistroRepository, RegistroRepository>();
      services.AddScoped<IRegistroService, RegistroService>();


      services.AddHttpContextAccessor();
      services.AddScoped<JsonWebToken>();
      services.AddSingleton<CurrentUser>();

      services.AddResponseCaching();

      // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
      services.AddEndpointsApiExplorer();
      services.AddSwaggerGen();
      services.AddAutoMapper(typeof(Startup));
    }

    //Configure Middlewares
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

      // Configure the HTTP request pipeline.
      if (env.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }

      app.UseCors(builder => builder
          .AllowAnyHeader()
          .AllowAnyMethod()
          .SetIsOriginAllowed((host) => true)
          .AllowCredentials());

      app.UseHttpsRedirection();

      app.UseRouting();


      app.UseAuthentication();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });

    }

  }
}
