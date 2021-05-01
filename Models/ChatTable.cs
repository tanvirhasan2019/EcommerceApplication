using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class ChatTable
    {
        public int ChatTableId { get; set; }
        public string? AdminId { get; set; }
        public string? UserId { get; set; }
        public ApplicationUser? Admin { get; set; }
        public ApplicationUser? User { get; set; }

        public virtual List<Message>? Messages { get; set; }
    }
}
