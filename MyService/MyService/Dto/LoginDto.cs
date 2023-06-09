using System.ComponentModel.DataAnnotations;

namespace MyService.Dto
{
    public class LoginDto
    {
        [Required]
        [MinLength(5)]
        public string UserName { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
