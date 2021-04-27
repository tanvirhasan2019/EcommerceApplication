using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class CommentsDto
    {
        public int CommentsId { get; set; }

        public DateTime DateTime { get; set; }
        public string? CommentContent { get; set; }

        public int PostId { get; set; }
       // public Post? post { get; set; }

        public string? ClientId { get; set; }
        public UserCustomcs? Client { get; set; }
    }
}
