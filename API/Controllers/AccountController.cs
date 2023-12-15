using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
   
    public class AccountController : BaseApiController
    {
       
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context,ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
            
        }
        [HttpPost("register")]//Post: api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.Username)) 
            return BadRequest("Username is taken");

            using var hmac=new HMACSHA512();
            var user=new AppUser()
            {
                UserName=registerDto.Username,
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt=hmac.Key
            };
            _context.Add(user);
            await _context.SaveChangesAsync();
            return new UserDto
            {
                UserName=user.UserName,
                Token=_tokenService.CreateToken(user)
            };
        }
         [HttpPost("login")]//Post: api/account/register
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
           var user=await _context.Users.SingleOrDefaultAsync(x=>
           x.UserName==loginDto.Username.ToLower());
           if(user==null) return Unauthorized();
           using var hmac=new HMACSHA512(user.PasswordSalt);
           var computedHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
           for(int i=0;i<computedHash.Length;i++)
           {
            if(computedHash[i]!=user.PasswordHash[i])return Unauthorized("invalid password");
           }
           var result=new UserDto
            {
                UserName=user.UserName,
                Token=_tokenService.CreateToken(user)
            };
            Console.WriteLine($"Token: {result.Token}");
               return result;
        }
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x=>x.UserName==username.ToLower());
        }
       
    }
}