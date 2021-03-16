using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class OrderDetails
    {
        [Key]
        public int id { get; set; }

       // [ForeignKey("ClientOrder")]
        public int orderid { get; set; }

      //  [ForeignKey("Product")]
        public int productid { get; set; }
        public int quantity { get; set; }
        public double price { get; set; }

       

    }
}
