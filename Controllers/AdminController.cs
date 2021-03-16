using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using EcommerceApp.Data;
using EcommerceApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

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

                    
                   
                    _context.ProductImage.Add(product_image);
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





        [HttpPost]
        [Route("UpdateProduct")]
        public object UpdateProduct([FromBody] Productnew products)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

                    var data = _context.Products.FirstOrDefault(x => x.id == products.id);

                    if (data != null)
                    {

                        data.title = products.title;
                        data.description = products.description;
                        data.category = products.category;
                        data.subcategory = products.subcategory;
                        data.quantity = products.quantity;
                        data.price = products.price;
                        data.dateTime = DateTime.Now;
                        data.AddedBy = UserID;

                        
                    }


                    var data2 = _context.ProductImage.FirstOrDefault(x => x.productid == products.id);

                    if (data2 != null)
                    {

                        data2.img1 = Encoding.ASCII.GetBytes(products.Img[0].img1.ToString());
                        data2.img2 = Encoding.ASCII.GetBytes(products.Img[1].img2.ToString());
                        data2.img3 = Encoding.ASCII.GetBytes(products.Img[2].img3.ToString());
                        data2.img4 = Encoding.ASCII.GetBytes(products.Img[3].img4.ToString());
                        data2.img5 = Encoding.ASCII.GetBytes(products.Img[4].img5.ToString());
                          

                    }

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



        [HttpPost]
        [Route("DeleteProductId")]
        public object DeleteProductId([FromBody] Product productid)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var id2 = productid.id;

                    
                    var ProductImage = _context.ProductImage.Where(u => u.productid == productid.id);
                    foreach (var data in ProductImage)
                    {
                        var x = data;
                        _context.ProductImage.Remove(data);
                    }
                    
                     _context.SaveChanges();

                    var Product = _context.Products.Where(u => u.id == productid.id);
                    foreach (var data in Product)
                    {
                        var x = data;
                        _context.Products.Remove(data);
                    }
                    
                     _context.SaveChanges();

                   

                }
            }
            catch (Exception e)
            {
                

                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED"});


            }
          return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });
        }







        [HttpPost]
        [Route("DeleteMultipleProductId")]
        public object DeleteMultipleProductId([FromBody] MultipleProductId multipleProductId)
        {

            

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
               
                    for (int i=0; i< multipleProductId.id.Count; i++)
                    {
                        var ProductImage = _context.ProductImage.Where(u => u.productid == multipleProductId.id[i]);
                      
                        foreach (var data in ProductImage)
                        {
                          
                            _context.ProductImage.Remove(data);
                        }

                    }


                    for (int i = 0; i < multipleProductId.id.Count; i++)
                    {
                        var Product = _context.Products.Where(u => u.id == multipleProductId.id[i]);
                       
                        foreach (var data in Product)
                        {
                            
                            _context.Products.Remove(data);
                        }
                   
                    }

                    _context.SaveChanges();

                }
            }
            catch (Exception e)
            {


                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED"});


            }
            return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });
        }



    }

    // DATA BINDING FOR LIST OF PRODUCT ID

    public class MultipleProductId 
    {   
       public virtual List<int> id { get; set; }

      
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
