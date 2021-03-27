using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class ShippingDetails
    {

        [Key]
        public int shippingid { get; set; }


        [ForeignKey("ClientOrder")]
       
        public int ClientOrderOrderid { get; set; }

        public string firstname { get; set; }
        public string lastname { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string phonenumber { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string zip { get; set; }

        

    }
}
