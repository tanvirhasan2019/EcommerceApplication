using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class ChatTableDto
    {
        public int ChatTableId { get; set; }
        public string? AdminId { get; set; }
        public string? UserId { get; set; }
        public UserCustomcs? Admin { get; set; }
        public UserCustomcs? User { get; set; }

        public virtual List<Message>? Messages { get; set; }
    }
}
