using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Extenstions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration config)
        {
                services.AddDbContext<DataContext>(option=>
                    {
                    option.UseSqlServer(config.GetConnectionString("DefaultConnection"));
                    });
                    services.AddCors();
                    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
                    services.AddEndpointsApiExplorer();

                    services.AddScoped<ITokenService,TokenService>();
                    services.AddScoped<IUserRepository,UserRepository>();
                    services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
                    return services;

        }
    }
}