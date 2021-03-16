using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class ClientOrder
    {
        
        [Key]
        public int orderid { get; set; }
        public DateTime dateTime { get; set; }
        public string userid { get; set; }
        public virtual List<OrderDetails> order { get; set; }
        public virtual List<ShippingDetails> shipping { get; set; }
        public virtual List<Transaction> transaction { get; set; }
        

    }
}
