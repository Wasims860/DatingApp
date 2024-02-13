using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
  [Authorize]
    public class UsersController:BaseApiController
    {
        
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public UsersController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }
        [AllowAnonymous]
         [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() 
        {
            var users=await _context.Users.ToListAsync();
            return users;
        }
        [Authorize]
        [HttpGet("{id}")]
         public  async Task<ActionResult<AppUser>> GetUser(int id) 
         {
            return await _context.Users.FindAsync(id);
         }
         
    }
   
}