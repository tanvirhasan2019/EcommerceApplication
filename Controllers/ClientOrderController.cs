using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EcommerceApp.Data;
using EcommerceApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EcommerceApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientOrderController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ClientOrderController> _logger;


        public ClientOrderController(ApplicationDbContext context, ILogger<ClientOrderController> logger, UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;

        }



        [HttpPost]
        [Route("PlaceOrder")]
        public object PlaceOrder([FromBody] CustomOrder order)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var order_place = new ClientOrder
                    {     
                       dateTime = DateTime.Now,
                       userid = UserID         
                    };
                    
                    _context.Add<ClientOrder>(order_place);
                    _context.SaveChanges();


                    ClientOrder obj = new ClientOrder();
                    int ordeID = order_place.orderid;

                   
                   
                    int listLength = order.productid.Count;
                    double total_amount = 0;

                    for(int i=0; i<listLength; i++)
                    {
                        var order_details = new OrderDetails();

                        order_details.orderid = ordeID;
                        order_details.productid = order.productid[i];
                        order_details.quantity = order.quantity[i];
                        order_details.price = order.price[i];

                        _context.OrderDetails.Add(order_details);
                        _context.SaveChanges();


                        total_amount += order.price[i]*order.quantity[i];
                    }
                   
                    var transaction = new Transaction

                    {
                        orderid = ordeID,
                        amount = total_amount,
                        payementType = order.payementType  
                    };
                   

                    _context.Transaction.Add(transaction);
                    _context.SaveChanges();


                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });
            }

        return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });

        }

    }

    public class CustomOrder
    {  
            public List<int> productid { get; set; }
            public List<int> quantity { get; set; }
            public List<double> price { get; set; }
            public string payementType { get; set; }
        
    }
}
