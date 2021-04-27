using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class PostDto
    {
       
        public int PostId { get; set; }

        public DateTime DateTime { get; set; }
        public string? PostContent { get; set; }

        public string? ClientId { get; set; }

        public List<CommentsDto>? comments { get; set; }

        public List<PostLikeDto>? Likes { get; set; }

      //  public string? Approved { get; set; }
        public UserCustomcs? Client { get; set; }


    

       
    }
}
