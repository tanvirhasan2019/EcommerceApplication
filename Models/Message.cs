using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class Message
    {
        public int MessageId { get; set; }

        public string? Messages { get; set; } 
        public string? FromId { get; set; }
        public string? ToId { get; set; }
       
        public ApplicationUser? From { get; set; }
        public ApplicationUser? To { get; set; }
    }
}
