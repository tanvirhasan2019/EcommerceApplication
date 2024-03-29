﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class Message
    {
        public int MessageId { get; set; }

        public string? Messages { get; set; } 
      
        public int ChatTableId { get; set; }
        public ChatTable? ChatTable { get; set; }
        public DateTime DateTime { get; set; }

        public string? UserId { get; set; }
        public ApplicationUser? User { get; set; }

      
    }
}
