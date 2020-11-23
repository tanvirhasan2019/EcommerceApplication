using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
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
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AdminController> _logger;


        public AdminController(ApplicationDbContext context, ILogger<AdminController> logger, UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;

        }


        [HttpPost]
        [Route("CreateProduct")]
        public object CreateProduct([FromBody] Productnew products)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                   
                    
                    var product = new Product
                    {
                        title = products.title,
                        description = products.description,
                        category = products.category,
                        subcategory= products.subcategory,
                        quantity = products.quantity,
                        price = products.price,
                        dateTime = DateTime.Now,
                        AddedBy = UserID

                    };
                    _context.Products.Add(product);
                    _context.SaveChanges();

                    Product pr = new Product();
                    int FK_imageId = product.id;

                   
                       var product_image = new ProductImage
                       {
                           img1 = Encoding.ASCII.GetBytes(products.Img[0].img1.ToString()),
                           img2 = Encoding.ASCII.GetBytes(products.Img[1].img2.ToString()),
                           img3 = Encoding.ASCII.GetBytes(products.Img[2].img3.ToString()),
                           img4 = Encoding.ASCII.GetBytes(products.Img[3].img4.ToString()),
                           img5 = Encoding.ASCII.GetBytes(products.Img[4].img5.ToString()),
                           productid = FK_imageId 
                       };

                    //  byte[] img55 = Encoding.ASCII.GetBytes(products.Img[4].img5.ToString());
                    //  string value = System.Text.Encoding.UTF8.GetString(img55);
                   
                    _context.ProductImage.Add(product_image);
                    _context.SaveChanges();

                    // return Ok("DATA SAVED SUCCESSFULLY");
                    //return Content("DATA SAVED SUCCESSFULLY");
                    // return Json(new Response { Id = 123, Name = "Hero" });
                  //  return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                // return Ok("SOMETHING WENT WRONG");
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });
                /* return new Response
                 {
                     Status = "FAILED",
                     Message = "SOMETHING WENT WRONG"
                 };*/

            }

            // return Ok("SOMETHING WENT WRONG");
            return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });
        }


    }



    //PRODUCT CREATION AND BINDING WITH IMAGE
    public class Productnew
    {

        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string category { get; set; }
        public string subcategory { get; set; }
        public int quantity { get; set; }
        public double price { get; set; }
       // public List<Img> Img { get; set; }
        public virtual List<Img> Img { get; set; }

    }

    public class Img
    {
        public string img1 { get; set; }
        public string img2 { get; set; }
        public string img3 { get; set; }
        public string img4 { get; set; }
        public string img5 { get; set; }
    } 

}
