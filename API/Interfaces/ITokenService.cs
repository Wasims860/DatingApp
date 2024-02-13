using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
       Task<UserDto> RegisterAsync(RegisterDto model);
        Task<UserDto> GetTokenAsync(LoginDto model);
        Task<string> AddRoleAsync(AddRoleModel model);
        Task<UserDto> RefreshTokenAsync(string token);
        Task<bool> RevokeTokenAsync(string token);
    }
}