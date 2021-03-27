using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class Product
    {
        
        public int id { get; set; }

        public string title { get; set; }
        public DateTime dateTime { get; set; } 
        public string description { get; set; }
        public string category { get; set; }

        public string subcategory { get; set; }
        public int quantity { get; set; }
        public double price { get; set; }

        public string AddedBy { get; set; }

        public virtual List <ProductImage> Img { get; set; }

      



    }
}
