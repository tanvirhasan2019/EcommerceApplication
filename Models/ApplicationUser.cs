using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class ApplicationUser : IdentityUser
    {
       // public virtual ICollection<IdentityUserRole<string>>? Users { get; set; }
       //public virtual ICollection<IdentityRoleClaim<string>> ? Claims { get; set; }
    }
}
