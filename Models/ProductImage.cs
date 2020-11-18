using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class ProductImage
    {
        public int id { get; set; }

        [ForeignKey("Product")]
        public int productid { get; set; }
        public byte[] img1 { get; set; }
        public byte[] img2 { get; set; }
        public byte[] img3 { get; set; }
        public byte[] img4 { get; set; }
        public byte[] img5 { get; set; }
    }
}
