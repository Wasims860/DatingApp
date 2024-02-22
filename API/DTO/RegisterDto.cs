using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class RegisterDto
    {
         [Required, StringLength(100)]
        public string FirstName { get; set; }

        [Required, StringLength(100)]
        public string LastName { get; set; }

        [Required, StringLength(50)]
        public string UserName { get; set; }

        [Required, StringLength(128),EmailAddress]
        public string Email { get; set; }
       [Required] public string KnownAs { get; set; }
       [Required] public string Gender { get; set; }
       [Required] public DateTime? DateOfBirth { get; set; }
       [Required] public string City { get; set; }
       [Required] public string Country { get; set; }

        [Required, StringLength(256)]
        public string Password { get; set; }
        [Required, StringLength(256)]
        public string ConfirmPassword { get; set; }
    }
}