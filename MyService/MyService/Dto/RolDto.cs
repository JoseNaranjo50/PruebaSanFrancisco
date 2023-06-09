using System.ComponentModel.DataAnnotations;

namespace MyService.Dto
{
    public class RolDto
    {
        public int Id { get; set; }
        [StringLength(20)]
        public string Name { get; set; }

        public Boolean IsActive { get; set; } = true;

        public List<UserDto> Users { get; set; }
    }
}
