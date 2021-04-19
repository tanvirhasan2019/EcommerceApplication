using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class PostLike
    {
        public int PostLikeId { get; set; }
      
        public int Like { get; set; } // 1 = LIKE ; -1 = DISLIKE
        public int PostId { get; set; }
        public Post? post { get; set; }

        public string? ClientId { get; set; }
        public ApplicationUser? Client { get; set; }

       
    }
}
