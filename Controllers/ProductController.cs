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

