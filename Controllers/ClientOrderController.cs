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
using Microsoft.EntityFrameworkCore;
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
            int order_id_send_client = 0;
            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var order_place = new ClientOrder
                    {     
                       dateTime = DateTime.Now,
                       userid = UserID ,
                       Status = "processing"
                };
                    
                    _context.Add<ClientOrder>(order_place);
                    _context.SaveChanges();


                    ClientOrder obj = new ClientOrder();
                    int ordeID = order_place.Orderid;

                   
                   
                    int listLength = order.productid.Count;
                    double total_amount = 0;

                    for(int i=0; i<listLength; i++)
                    {
                        var order_details = new OrderDetails();

                        order_details.ClientOrderOrderid = ordeID;
                        order_details.Productid = order.productid[i];
                        order_details.quantity = order.quantity[i];
                        order_details.price = order.price[i];
                        
                        _context.OrderDetails.Add(order_details);
                        _context.SaveChanges();


                        total_amount += order.price[i]*order.quantity[i];
                    }
                   
                    var transaction = new Transaction

                    {
                        ClientOrderOrderid = ordeID,
                        amount = total_amount,
                        payementType = order.payementType  
                    };
                   

                    _context.Transaction.Add(transaction);
                    _context.SaveChanges();



                    var shipping = new ShippingDetails

                    {
                        ClientOrderOrderid = ordeID,
                        firstname = order.firstname,
                        lastname = order.lastname,
                        address1 =order.address1,
                        address2 = order.address2,
                        phonenumber =order.phonenumber,
                        city =order.city,
                        country =order.country,
                        zip =order.zip
                    };


                    _context.ShippingDetails.Add(shipping);
                    _context.SaveChanges();

                    order_id_send_client = ordeID;


                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });
            }

        return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS", ORDER_ID= order_id_send_client });

        }




        [HttpGet]
        [Route("Getuserorder")]
        public async Task<IActionResult> Getuserorder()
        {
            try
            {
                
            if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var productList = await _context.Products.ToListAsync();
                    var OrderDetails = await _context.OrderDetails.ToListAsync();
                    var Transaction = await _context.Transaction.ToListAsync();
                    var ShippingDetails = await _context.ShippingDetails.ToListAsync();
                    var ClientOrder = await _context.ClientOrder.Where(c => c.userid == UserID).ToListAsync();
                    return Ok(new { data = ClientOrder });
                }

               
            }
            catch (Exception)
            {
                return Ok(new { status = "FAILED" });
            }

            return Ok(new { status = "SUCCESS" });

        }

    }

    public class CustomOrder
    {  
            public List<int>? productid { get; set; }
            public List<int>? quantity { get; set; }
            public List<double>? price { get; set; }
            public string ? payementType { get; set; }

            public string ? firstname { get; set; }
            public string? lastname { get; set; }
            public string? address1 { get; set; }
            public string? address2 { get; set; }
            public string? phonenumber { get; set; }
            public string? city { get; set; }
            public string? country { get; set; }
            public string? zip { get; set; }
        
    }
}
