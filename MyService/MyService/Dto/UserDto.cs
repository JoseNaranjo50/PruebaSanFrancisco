﻿using MyService.Authentication;

namespace MyService.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public Boolean IsActive { get; set; } = true;

        public int RolId { get; set; }
        public RolDto Rol { get; set; }
    }
}
