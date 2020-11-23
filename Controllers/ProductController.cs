using System;
using System.Collections.Generic;
using System.Linq;
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


        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {

            var productImage = await _context.ProductImage.ToListAsync();
            var productList = await _context.Products.ToListAsync();
          

         /*   var obj = new CustomProductImage();
            foreach(var x in productImage)
            {
                obj.id = x.id;
                obj.productid = x.productid;
                obj.img1 = System.Text.Encoding.Default.GetString(x.img1);
                obj.img2 = System.Text.Encoding.Default.GetString(x.img2);
                obj.img3 = System.Text.Encoding.Default.GetString(x.img3); 
                obj.img4 = System.Text.Encoding.Default.GetString(x.img4); 
                obj.img5 = System.Text.Encoding.Default.GetString(x.img5);

            };*/
           
            return Ok(new { data = productList });      
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

