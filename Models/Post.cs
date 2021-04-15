using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class Post
    {
        public int PostId { get; set; }
        
        public DateTime DateTime { get; set; }
        public string? PostContent { get; set; }

        public string? ClientId { get; set; }
        public ApplicationUser? Client { get; set; }

        public List<Comments>? comments { get; set; }



    }
}
