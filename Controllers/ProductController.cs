using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EcommerceApp.Data;
using EcommerceApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using static EcommerceApp.Controllers.AdminController;

namespace EcommerceApp.Controllers
{   
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProductController> _logger;


        public ProductController(ApplicationDbContext context, ILogger<ProductController> logger, UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;

        }


        // @User
        // ACCESS : MANAGER , ADMINISTRATOR , ADMIN , USER
        //DESC : return all products that is available



        [AllowAnonymous]
        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {

            var productImage = await _context.ProductImage.ToListAsync();
            var productList = await _context.Products.ToListAsync();



            return Ok(new { data = productList });
        }


        // @User
        // ACCESS : MANAGER , ADMINISTRATOR , ADMIN , USER
        //DESC : return a products through id

        [AllowAnonymous]
        [HttpGet]
        [Route("GetSingleProduct/{id:int}")]
        public async Task<IActionResult> GetSingleProduct(int id)
        {

            var productImage = await _context.ProductImage.Where(c => c.productid == id).ToListAsync();
            var productList = await _context.Products.Where(c => c.id == id).ToListAsync();

            return Ok(new { data = productList });
        }



        // @User
        // ACCESS : MANAGER , ADMINISTRATOR , ADMIN , USER
        //DESC : task is not completed or removed

        [HttpPost]
        [Route("PlaceOrder")]
        public object PlaceOrder([FromBody] Productnew products)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var product = new Product
                    {

                    };
                    _context.Products.Add(product);
                    _context.SaveChanges();

                    Product pr = new Product();
                    int FK_imageId = product.id;

                    var product_image = new ProductImage
                    {

                    };
                    _context.ProductImage.Add(product_image);
                    _context.SaveChanges();
                }
            }
            catch (Exception)
            {
                
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });
            }
            return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });
        }



        // @Role
        // ACCESS : MANAGER , ADMINISTRATOR , ADMIN 
        //DESC : return all Order List

        [HttpGet]
        [Route("AllOrderList")]
        public async Task<IActionResult> AllOrderList()
        {


            var statusCode = 400;
           // var ClientOrder = "";
            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    if (UserID != null)
                    {
                        var userrole = _context.UserRoles.Where(x => x.UserId == UserID).FirstOrDefault();
                        if (userrole != null)
                        {
                            var rolename = _context.Roles.Where(x => x.Id == userrole.RoleId).FirstOrDefault();
                            if (rolename.Name == Role.Admin || rolename.Name == Role.Manager || rolename.Name == Role.Administrator)
                            {
                                var productList = await _context.Products.ToListAsync();

                                var OrderDetails = await _context.OrderDetails.ToListAsync();

                                var Transaction = await _context.Transaction.ToListAsync();

                                var ShippingDetails = await _context.ShippingDetails.ToListAsync();

                                var ClientOrder = await _context.ClientOrder.ToListAsync();
                                statusCode = 200 ;



                                return Ok(new
                                {
                                    clientorder = ClientOrder,

                                });

                            }

                        }
                        else
                        {
                            return Ok(new { status = "Access Denied", statusCode = 403 });
                        }

                    }
                    

                }
                else
                {
                    statusCode = 500;
                }
            }
            catch (Exception)
            {
                
                return Ok(new
                {
                    status = "ERROR" , statusCode = statusCode

                });
            }

            return Ok(new { statusCode = statusCode });


        }



        // @User
        // ACCESS : MANAGER , ADMINISTRATOR , ADMIN , USER
        //DESC : return order item through id

        [HttpGet]
        [Route("GetSingleOrderItem")]
        public async Task<IActionResult> GetSingleOrderItem()
        {

            try
            {

                var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var ClientOrder = await _context.ClientOrder.Where(c => c.userid == UserID).ToListAsync();
                var OrderDetail = await _context.OrderDetails.ToListAsync();
                var Transaction = await _context.Transaction.ToListAsync();
                var ShippingDetails = await _context.ShippingDetails.ToListAsync();

                return Ok(new
                {
                    clientorder = ClientOrder,
                    orderdetails = OrderDetail,
                    transaction = Transaction,
                    shippingdetails = ShippingDetails
                });

            }
            catch (Exception)
            {
                return Ok(new
                {
                    status = "ERROR"
                });
            }



        }


    }


    public class CustomProductImage
    {
        public int id { get; set; } 
        public int productid { get; set; }
        public string img1 { get; set; }
        public string img2 { get; set; }
        public string img3 { get; set; }
        public string img4 { get; set; }
        public string img5 { get; set; }
    }
}

