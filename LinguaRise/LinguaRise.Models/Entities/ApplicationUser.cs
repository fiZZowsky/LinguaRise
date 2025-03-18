using Microsoft.AspNetCore.Identity;

namespace LinguaRise.Models.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
