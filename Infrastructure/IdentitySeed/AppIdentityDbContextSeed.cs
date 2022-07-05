using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.IdentitySeed
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedData(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var appUser=new AppUser{
                    Email="bob@test.com",
                    UserName="bob@test.com",
                    DisplayName="bob",
                    Address=new Address{
                        FirstName="Bob",
                        LastName="Kumar",
                        Street="Tirupati Nagar Phase-2",
                        City="Virar",
                        State="Maharashtra",
                        ZipCode="401303",                        
                    }
                };

                await userManager.CreateAsync(appUser,"Pa$$w0rd");
            }
        }
    }
}