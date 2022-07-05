using System.Security.Claims;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {   
        public static async Task<AppUser> GetUserFromClaimsPrincipalWithAddress(this UserManager<AppUser> userManager,ClaimsPrincipal user)
        {
            var email=user.FindFirstValue(ClaimTypes.Email);
            return await userManager.Users.Include(x=>x.Address).SingleOrDefaultAsync(x=>x.Email==email);
        }

        public static async Task<AppUser> GetUserFromClaimsPrincipal(this UserManager<AppUser> userManager,ClaimsPrincipal claimsPrincipal)
        {
            var email=claimsPrincipal.FindFirstValue(ClaimTypes.Email);
            return await userManager.Users.SingleOrDefaultAsync(x=>x.Email==email);
        }
    }
}