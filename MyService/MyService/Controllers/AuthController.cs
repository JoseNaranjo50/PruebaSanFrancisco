using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyService.Authentication;
using MyService.Dto;

namespace MyService.Controllers
{
    [ApiController]
    [Route("/api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly JsonWebToken jsonWebToken;
        private readonly CurrentUser currentUser;

        public AuthController(ApplicationDbContext context, IMapper mapper, JsonWebToken jsonWebToken, CurrentUser currentUser)
        {
            this.context = context;
            this.mapper = mapper;
            this.jsonWebToken = jsonWebToken;
            this.currentUser = currentUser;
        }

        [HttpPost("login")]
        public async Task<ActionResult<ResponseLoginDto>> login()
        {
            var user = new UserDto();
            user.UserName = "admin";
            user.LastName = "admin";
            user.Name = "admin";
            user.Id = 1;
            user.Email = "admin@gmail.com";
            var token = jsonWebToken.CreateToken(user);

            ResponseLoginDto responseLoginDto = new ResponseLoginDto();
            responseLoginDto.Token = token;
            responseLoginDto.User = mapper.Map<UserDto>(user);

            return responseLoginDto;
        }

    }
}