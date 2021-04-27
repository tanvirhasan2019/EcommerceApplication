using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class PostLikeDto
    {
        public int PostLikeId { get; set; }

        public int Like { get; set; } 
        public int PostId { get; set; }
     //   public Post? post { get; set; }

        public string? ClientId { get; set; }
        public UserCustomcs? Client { get; set; }
    }
}
