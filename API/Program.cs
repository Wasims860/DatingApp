using API.Data;
using API.Entities;
using API.Extenstions;
using API.Middleware;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<API.Helpers.JWT>(builder.Configuration.GetSection("JWT"));
builder.Services.AddIdentity<AppUser, IdentityRole>().AddEntityFrameworkStores<DataContext>();
builder.Services.AddScoped<API.Interfaces.ITokenService, API.Services.TokenService>();
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

//app.UseCors(builder=>builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));
app.UseCors(builder =>
{
    builder.WithOrigins("https://localhost:4200") // Update with your client application's origin
           .AllowAnyHeader()
           .AllowAnyMethod();
});
app.UseAuthentication();
app.UseAuthorization();

//if (app.Environment.IsDevelopment())
//{
    //app.UseSwagger();
    //app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();
app.MapControllers();
var scopeFactory = app.Services.GetRequiredService<IServiceScopeFactory>();

using var scope = scopeFactory.CreateScope();

var userManger = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
var services = scope.ServiceProvider;
var context= services.GetRequiredService<DataContext>();
try
{
await Seed.SeedUsers(context,userManger);
}
catch(Exception ex)
{
    var logger= services.GetService<ILogger<Program>>();
    logger.LogError(ex, "an error occured during seedUsers");
}

app.Run();
