using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(DataContext context, UserManager<AppUser> userManager)
    {
        if (await context.Users.AnyAsync()) return;
        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var users=JsonSerializer.Deserialize<List<AppUser>>(userData);
        foreach (var user in users)
        {
            await userManager.CreateAsync(user, "P@ssword123");
            await userManager.AddToRoleAsync(user, "User");
           
        }
    }


}
