using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser:IdentityUser
    {
        
        [Required]
        public string FirstName { get; set; }
         [Required]
        public string LastName { get; set; }
         public List<RefreshToken> RefreshTokens { get; set; }

    }
}