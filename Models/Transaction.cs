using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Models
{
    public class Transaction
    {
        [Key]
        public int trsansactionid { get; set; }

      //  [ForeignKey("ClientOrder")]
        public int orderid { get; set; }
        public double amount { get; set; }
        public string payementType { get; set; }
    }
}
